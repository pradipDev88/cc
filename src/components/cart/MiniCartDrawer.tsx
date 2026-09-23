import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import './MiniCartDrawer.scss';

export const MiniCartDrawer: React.FC = () => {
  const {
    items,
    isOpenMiniCart,
    setMiniCartOpen,
    updateQuantity,
    removeItem,
    getSubtotal,
    getShippingCharge,
    getFinalTotal,
    freeShippingThreshold
  } = useCartStore();

  if (!isOpenMiniCart) return null;

  const subtotal = getSubtotal();
  const shipping = getShippingCharge();
  const finalTotal = getFinalTotal();
  const amountNeededForFreeShip = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="mini-cart-backdrop" onClick={() => setMiniCartOpen(false)}>
      <div className="mini-cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-head">
          <div className="title-area">
            <ShoppingBag size={20} />
            <h3 className="drawer-title">Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})</h3>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setMiniCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="shipping-progress-banner">
          {amountNeededForFreeShip > 0 ? (
            <p className="shipping-hint">
              Add <strong>₹{amountNeededForFreeShip.toLocaleString('en-IN')}</strong> more for <strong>FREE EXPRESS DELIVERY</strong>
            </p>
          ) : (
            <p className="shipping-hint unlocked">
              <ShieldCheck size={16} /> You unlocked complimentary Express Shipping!
            </p>
          )}
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Items List */}
        <div className="drawer-items">
          {items.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={48} className="empty-icon" />
              <h4>Your carry bag is empty</h4>
              <p>Explore our ergonomic backpacks, laptop carriers, and travel bags.</p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setMiniCartOpen(false)}
              >
                Start Exploring
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="cart-card">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <div className="info-top">
                    <span className="cart-brand">{item.brand}</span>
                    <button
                      className="item-remove-btn"
                      onClick={() => removeItem(item.productId, item.variantId)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <Link
                    to={`/product/${item.productSlug}`}
                    onClick={() => setMiniCartOpen(false)}
                    className="cart-name"
                  >
                    {item.name}
                  </Link>
                  <p className="cart-variant-label">
                    Edition: <span>{item.colorName}</span> {item.capacity && `| ${item.capacity}`}
                  </p>

                  <div className="cart-qty-price-row">
                    <div className="qty-controls">
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        className="qty-btn"
                        disabled={item.quantity >= item.maxStock}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="price-stack">
                      <span className="current-price">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="original-price">
                          ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span className="label">Subtotal</span>
              <span className="value">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="shipping-row">
              <span className="label">Standard Delivery</span>
              <span className="value">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="total-row">
              <span className="total-label">Estimated Total</span>
              <span className="total-amount">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="drawer-actions">
              <Link
                to="/cart"
                onClick={() => setMiniCartOpen(false)}
                className="btn btn-outline view-cart-btn"
              >
                View Full Bag
              </Link>
              <Link
                to="/checkout"
                onClick={() => setMiniCartOpen(false)}
                className="btn btn-primary checkout-btn"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

