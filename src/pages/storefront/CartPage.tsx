import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Heart } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useToastStore } from '../../store/useToastStore';
import { useAdminStore } from '../../store/useAdminStore';
import './CartPage.scss';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getShippingCharge,
    getFinalTotal,
    discountAmount,
    couponCode,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold
  } = useCartStore();

  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const addToast = useToastStore((s) => s.addToast);
  const coupons = useAdminStore((s) => s.coupons);

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const shipping = getShippingCharge();
  const finalTotal = getFinalTotal();
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = inputCoupon.trim().toUpperCase();
    const matched = coupons.find((c) => c.code === code && c.isActive);

    if (!matched) {
      setCouponError('Invalid promotion code. Try VELOFIRST or FREESHIP.');
      return;
    }

    if (subtotal < matched.minOrderAmount) {
      setCouponError(`This coupon requires a minimum cart total of ₹${matched.minOrderAmount.toLocaleString('en-IN')}`);
      return;
    }

    let discount = 0;
    if (matched.discountType === 'FLAT') {
      discount = matched.discountValue;
    } else {
      discount = Math.min(matched.maxDiscount || 9999, Math.round((subtotal * matched.discountValue) / 100));
    }

    applyCoupon(code, discount);
    setInputCoupon('');
    addToast({
      type: 'success',
      title: 'Coupon Applied!',
      description: `Saved ₹${discount.toLocaleString('en-IN')} with ${code}`
    });
  };

  if (items.length === 0) {
    return (
      <div className="cart-page-empty container">
        <div className="empty-box">
          <ShoppingBag size={56} className="empty-icon" />
          <h1 className="heading-1">Your Shopping Bag is Empty</h1>
          <p className="lead">
            Discover our collection of student orthopedic backpacks, executive laptop gear, and fine leather luggage.
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Explore All Bags
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-view container">
      {/* Free Shipping Tracker */}
      <div className="cart-shipping-banner">
        {amountNeeded > 0 ? (
          <p className="shipping-msg">
            Add <strong>₹{amountNeeded.toLocaleString('en-IN')}</strong> more to unlock <strong>FREE EXPEDITED SHIPPING</strong>
          </p>
        ) : (
          <p className="shipping-msg success">
            <ShieldCheck size={18} /> Congratulations! Your order qualifies for <strong>Complimentary Express Shipping</strong>.
          </p>
        )}
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="cart-content-grid">
        {/* Left Column: Bag Items */}
        <div className="cart-items-column">
          <div className="column-header">
            <h1 className="heading-2">Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})</h1>
            <button onClick={clearCart} className="clear-all-btn">
              Clear Bag
            </button>
          </div>

          <div className="cart-items-table">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="cart-table-row">
                <Link to={`/product/${item.productSlug}`} className="item-thumbnail-link">
                  <img src={item.image} alt={item.name} className="item-thumb" />
                </Link>

                <div className="item-primary-meta">
                  <span className="item-brand">{item.brand}</span>
                  <Link to={`/product/${item.productSlug}`} className="item-title">
                    {item.name}
                  </Link>
                  <p className="item-spec">
                    Color: <strong>{item.colorName}</strong> {item.capacity && `• Volume: ${item.capacity}`}
                  </p>

                  <div className="item-mobile-actions">
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="item-action-link"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="item-qty-cell">
                  <div className="qty-picker">
                    <button
                      onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                      className="qty-btn"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="qty-num">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                      disabled={item.quantity >= item.maxStock}
                      className="qty-btn"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Price Total */}
                <div className="item-total-cell">
                  <span className="line-price">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                  {item.originalPrice > item.price && (
                    <span className="original-line-price">
                      ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="item-desktop-remove">
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="trash-btn"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="cart-summary-column">
          <div className="summary-card">
            <h2 className="summary-title">Order Summary</h2>

            {/* Subtotal, Shipping, Taxes */}
            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-row discount">
                  <span>Coupon Discount ({couponCode})</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Estimated Express Shipping</span>
                <span>{shipping === 0 ? <strong className="free-text">FREE</strong> : `₹${shipping}`}</span>
              </div>

              <div className="summary-row">
                <span>GST Tax (Included)</span>
                <span>₹{Math.round(subtotal * 0.05).toLocaleString('en-IN')}</span>
              </div>

              <div className="summary-total-row">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="coupon-box">
              {couponCode ? (
                <div className="active-coupon-badge">
                  <div className="badge-meta">
                    <Tag size={16} />
                    <span>Code <strong>{couponCode}</strong> applied</span>
                  </div>
                  <button onClick={removeCoupon} className="remove-coupon-btn">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. VELOFIRST)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                  />
                  <button type="submit" className="apply-coupon-btn">
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="coupon-error-msg">{couponError}</p>}
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-lg checkout-cta-btn"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div className="security-assurances">
              <ShieldCheck size={18} className="shield-icon" />
              <span>256-Bit SSL Encrypted &amp; PCI-DSS Level 1 Verified Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

