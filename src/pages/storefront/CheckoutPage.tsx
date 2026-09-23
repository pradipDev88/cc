import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, CreditCard, Smartphone, Building, Truck, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useOrderStore } from '../../store/useOrderStore';
import { useAuthStore } from '../../store/useAuthStore';
import { ShippingAddress, Order } from '../../types';
import './CheckoutPage.scss';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, getShippingCharge, getFinalTotal, discountAmount, couponCode, clearCart } = useCartStore();
  const createOrder = useOrderStore((s) => s.createOrder);
  const { customer } = useAuthStore();

  const [step, setStep] = useState<'address' | 'delivery' | 'payment' | 'review'>('address');

  // Form States
  const [address, setAddress] = useState<ShippingAddress>({
    id: 'addr-new',
    fullName: customer?.name || 'Ashish Ojha',
    phone: customer?.phone || '+91 98765 43210',
    addressLine1: 'B-402, Prestige Tower, 100 Feet Road',
    addressLine2: 'Near Indiranagar Metro',
    landmark: 'Opposite Starbucks',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    addressType: 'Home',
    isDefault: true
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'STANDARD' | 'EXPRESS'>('STANDARD');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('ashish@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const shipping = deliveryMethod === 'EXPRESS' ? 149 : getShippingCharge();
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);

  if (items.length === 0) {
    return (
      <div className="checkout-empty container">
        <h2>Your shopping bag is empty</h2>
        <Link to="/products" className="btn btn-primary mt-4">Return to Store</Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = 'VLO-' + Math.floor(10000 + Math.random() * 90000);
      const newOrder: Order = {
        id: 'ord-' + Date.now(),
        orderNumber,
        userId: customer?.id || 'cust-01',
        customerName: address.fullName,
        customerEmail: customer?.email || 'customer@velobags.com',
        customerPhone: address.phone,
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          name: i.name,
          colorName: i.colorName,
          image: i.image,
          price: i.price,
          quantity: i.quantity
        })),
        shippingAddress: address,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
        deliveryMethod,
        subtotal,
        discount: discountAmount,
        couponCode: couponCode || undefined,
        shippingCharge: shipping,
        tax: Math.round(subtotal * 0.05),
        totalAmount: finalTotal,
        status: 'PLACED',
        courierName: 'BlueDart Express Air',
        trackingNumber: 'BD-' + Math.floor(100000000 + Math.random() * 900000000),
        estimatedDelivery: deliveryMethod === 'EXPRESS' ? 'Within 24-48 Hours' : '3 to 5 Business Days',
        placedAt: new Date().toISOString(),
        timeline: [
          {
            status: 'PLACED',
            title: 'Order Placed & Payment Verified',
            description: `Payment of ₹${finalTotal.toLocaleString('en-IN')} confirmed via ${paymentMethod}.`,
            timestamp: new Date().toLocaleString(),
            location: 'Bengaluru Central Fulfillment'
          }
        ]
      };

      createOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      navigate(`/order-success?orderId=${newOrder.id}`);
    }, 1200);
  };

  return (
    <div className="checkout-page-container container">
      {/* 4-Step Distraction-Free Header */}
      <div className="checkout-steps-tracker">
        <div className={`step-node ${step === 'address' ? 'active' : 'completed'}`}>
          <span className="step-num">1</span>
          <span className="step-title">Address</span>
        </div>
        <div className="step-divider" />
        <div className={`step-node ${step === 'delivery' ? 'active' : step === 'payment' || step === 'review' ? 'completed' : ''}`}>
          <span className="step-num">2</span>
          <span className="step-title">Delivery</span>
        </div>
        <div className="step-divider" />
        <div className={`step-node ${step === 'payment' ? 'active' : step === 'review' ? 'completed' : ''}`}>
          <span className="step-num">3</span>
          <span className="step-title">Payment</span>
        </div>
        <div className="step-divider" />
        <div className={`step-node ${step === 'review' ? 'active' : ''}`}>
          <span className="step-num">4</span>
          <span className="step-title">Review</span>
        </div>
      </div>

      <div className="checkout-main-grid">
        {/* Left Interactive Step Form */}
        <div className="checkout-form-panel">
          {/* STEP 1: ADDRESS */}
          {step === 'address' && (
            <div className="checkout-step-section">
              <h2 className="step-heading">Delivery Address</h2>
              <div className="form-grid">
                <div className="form-group span-2">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Postal PIN Code *</label>
                  <input
                    type="text"
                    value={address.pincode}
                    maxLength={6}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group span-2">
                  <label>Flat, House No., Building, Apartment *</label>
                  <input
                    type="text"
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group span-2">
                  <label>Area, Colony, Sector, Street</label>
                  <input
                    type="text"
                    value={address.addressLine2}
                    onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="step-actions">
                <Link to="/cart" className="back-link">
                  <ArrowLeft size={16} /> Return to Cart
                </Link>
                <button onClick={() => setStep('delivery')} className="btn btn-primary">
                  Proceed to Delivery <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DELIVERY */}
          {step === 'delivery' && (
            <div className="checkout-step-section">
              <h2 className="step-heading">Select Shipping Speed</h2>
              <div className="delivery-options-list">
                <label className={`delivery-card ${deliveryMethod === 'STANDARD' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === 'STANDARD'}
                    onChange={() => setDeliveryMethod('STANDARD')}
                  />
                  <div className="delivery-meta">
                    <div className="delivery-top">
                      <span className="method-name">Standard Surface Courier (BlueDart / Delhivery)</span>
                      <span className="method-price">{getShippingCharge() === 0 ? 'FREE' : '₹99'}</span>
                    </div>
                    <p className="delivery-eta">Estimated delivery within 3-5 business days.</p>
                  </div>
                </label>

                <label className={`delivery-card ${deliveryMethod === 'EXPRESS' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === 'EXPRESS'}
                    onChange={() => setDeliveryMethod('EXPRESS')}
                  />
                  <div className="delivery-meta">
                    <div className="delivery-top">
                      <span className="method-name">Priority Air Express Dispatch</span>
                      <span className="method-price">₹149</span>
                    </div>
                    <p className="delivery-eta">Guaranteed delivery within 24 to 48 hours.</p>
                  </div>
                </label>
              </div>

              <div className="step-actions">
                <button onClick={() => setStep('address')} className="btn btn-outline">
                  <ArrowLeft size={16} /> Back to Address
                </button>
                <button onClick={() => setStep('payment')} className="btn btn-primary">
                  Proceed to Payment <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 'payment' && (
            <div className="checkout-step-section">
              <h2 className="step-heading">Select Payment Method</h2>
              <div className="payment-gateways-list">
                {/* UPI */}
                <label className={`payment-card ${paymentMethod === 'UPI' ? 'active' : ''}`}>
                  <div className="payment-head">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                    />
                    <Smartphone size={20} className="pay-icon" />
                    <span className="method-title">Instant UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                  </div>
                  {paymentMethod === 'UPI' && (
                    <div className="payment-expanded-body">
                      <label>Enter Virtual Payment Address (VPA / UPI ID)</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                      />
                      <span className="sub-hint">A collect request will be pushed to your UPI app.</span>
                    </div>
                  )}
                </label>

                {/* Cards */}
                <label className={`payment-card ${paymentMethod === 'CARD' ? 'active' : ''}`}>
                  <div className="payment-head">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'CARD'}
                      onChange={() => setPaymentMethod('CARD')}
                    />
                    <CreditCard size={20} className="pay-icon" />
                    <span className="method-title">Credit / Debit Card (Visa, MasterCard, Amex, RuPay)</span>
                  </div>
                  {paymentMethod === 'CARD' && (
                    <div className="payment-expanded-body">
                      <p className="card-mock-notice">
                        Safe 256-bit encrypted simulation. Never store real credentials here.
                      </p>
                    </div>
                  )}
                </label>

                {/* NetBanking */}
                <label className={`payment-card ${paymentMethod === 'NETBANKING' ? 'active' : ''}`}>
                  <div className="payment-head">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'NETBANKING'}
                      onChange={() => setPaymentMethod('NETBANKING')}
                    />
                    <Building size={20} className="pay-icon" />
                    <span className="method-title">Net Banking (All Major Indian Banks)</span>
                  </div>
                </label>

                {/* COD */}
                <label className={`payment-card ${paymentMethod === 'COD' ? 'active' : ''}`}>
                  <div className="payment-head">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                    />
                    <Truck size={20} className="pay-icon" />
                    <span className="method-title">Cash on Delivery (COD)</span>
                  </div>
                </label>
              </div>

              <div className="step-actions">
                <button onClick={() => setStep('delivery')} className="btn btn-outline">
                  <ArrowLeft size={16} /> Back to Delivery
                </button>
                <button onClick={() => setStep('review')} className="btn btn-primary">
                  Review Final Order <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & PLACE */}
          {step === 'review' && (
            <div className="checkout-step-section">
              <h2 className="step-heading">Review Order &amp; Confirm</h2>
              <div className="review-blocks">
                <div className="review-box">
                  <h4>Delivery Address</h4>
                  <p><strong>{address.fullName}</strong> ({address.phone})</p>
                  <p>{address.addressLine1}, {address.addressLine2}</p>
                  <p>{address.city}, {address.state} - {address.pincode}</p>
                </div>

                <div className="review-box">
                  <h4>Payment Method</h4>
                  <p><strong>{paymentMethod}</strong> ({paymentMethod === 'UPI' ? upiId : 'Verified'})</p>
                </div>
              </div>

              <div className="step-actions">
                <button onClick={() => setStep('payment')} className="btn btn-outline">
                  <ArrowLeft size={16} /> Back to Payment
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="btn btn-accent btn-lg place-order-final-btn"
                >
                  {isProcessing ? 'Processing Order...' : `Pay & Place Order • ₹${finalTotal.toLocaleString('en-IN')}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Order Summary */}
        <div className="checkout-sidebar-panel">
          <div className="checkout-cart-summary">
            <h3 className="summary-title">Bag Items ({items.length})</h3>
            <div className="items-mini-list">
              {items.map((i) => (
                <div key={`${i.productId}-${i.variantId}`} className="mini-item">
                  <img src={i.image} alt={i.name} className="mini-thumb" />
                  <div className="mini-meta">
                    <span className="mini-name">{i.name}</span>
                    <span className="mini-qty">Qty: {i.quantity} • {i.colorName}</span>
                    <span className="mini-price">₹{(i.price * i.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="cost-breakdown">
              <div className="cost-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="cost-row discount">
                  <span>Coupon Discount ({couponCode})</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="cost-row">
                <span>Shipping ({deliveryMethod})</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="cost-total-row">
                <span>Total Due</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pci-compliance">
              <ShieldCheck size={18} />
              <span>PCI-DSS Certified 256-Bit Encrypted Transaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

