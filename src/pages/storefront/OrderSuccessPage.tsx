import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Package, MapPin, Printer } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import confetti from 'canvas-confetti';
import './OrderSuccessPage.scss';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const getOrderById = useOrderStore((s) => s.getOrderById);

  const order = orderId ? getOrderById(orderId) : null;

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Confetti fallback
    }
  }, []);

  return (
    <div className="order-success-page container">
      <div className="success-banner-card">
        <div className="success-icon-wrap">
          <CheckCircle2 size={48} className="check-icon" />
        </div>
        <span className="success-tag">CONSIGNMENT REGISTERED</span>
        <h1 className="heading-1 success-title">Thank You For Your Patronage</h1>
        <p className="success-desc">
          Your order has been authorized and dispatched to our precision warehouse bay for 12-point quality inspection and packaging.
        </p>

        {order ? (
          <div className="order-metadata-card">
            <div className="meta-col">
              <span className="label">Order Reference</span>
              <strong className="val">{order.orderNumber}</strong>
            </div>
            <div className="meta-col">
              <span className="label">Estimated Delivery</span>
              <strong className="val">{order.estimatedDelivery}</strong>
            </div>
            <div className="meta-col">
              <span className="label">Amount Paid</span>
              <strong className="val">₹{order.totalAmount.toLocaleString('en-IN')}</strong>
            </div>
            <div className="meta-col">
              <span className="label">Payment Mode</span>
              <strong className="val">{order.paymentMethod}</strong>
            </div>
          </div>
        ) : (
          <div className="order-metadata-card">
            <div className="meta-col">
              <span className="label">Order Reference</span>
              <strong className="val">VLO-88219</strong>
            </div>
            <div className="meta-col">
              <span className="label">Estimated Delivery</span>
              <strong className="val">Within 48 Hours</strong>
            </div>
          </div>
        )}

        <div className="success-actions-row">
          <Link
            to={order ? `/track-order/${order.id}` : '/account/orders'}
            className="btn btn-primary btn-lg"
          >
            <Package size={18} /> Track Consignment Live
          </Link>

          <Link to="/products" className="btn btn-outline btn-lg">
            Continue Exploring <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

