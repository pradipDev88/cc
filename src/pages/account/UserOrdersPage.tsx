import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, RotateCcw, Download, ChevronRight, X } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useToastStore } from '../../store/useToastStore';
import './UserOrdersPage.scss';

export const UserOrdersPage: React.FC = () => {
  const { customer } = useAuthStore();
  const orders = useOrderStore((s) => s.getUserOrders(customer?.id || 'cust-01'));
  const requestReturn = useOrderStore((s) => s.requestReturn);
  const addToast = useToastStore((s) => s.addToast);

  const [returnModalOrder, setReturnModalOrder] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState('Size/Capacity incompatible with my everyday needs');

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (returnModalOrder) {
      requestReturn(returnModalOrder, returnReason);
      addToast({
        type: 'success',
        title: 'Return Request Registered',
        description: 'Our logistics courier will contact you within 24 hours for doorstep reverse pickup.'
      });
      setReturnModalOrder(null);
    }
  };

  return (
    <div className="user-orders-page">
      <div className="page-header">
        <h2 className="heading-2">My Orders &amp; Consignments</h2>
        <p className="lead-text">Track your parcel logistics, print GST tax invoices, or request doorstep returns.</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders-view">
          <Package size={48} className="empty-icon" />
          <h3>No Orders Placed Yet</h3>
          <p>Explore our premium collections and place your first order.</p>
          <Link to="/products" className="btn btn-primary btn-sm">Explore Collection</Link>
        </div>
      ) : (
        <div className="orders-stack">
          {orders.map((order) => (
            <div key={order.id} className="user-order-card">
              {/* Order Card Head */}
              <div className="card-top-bar">
                <div className="meta-left">
                  <span className="order-number">{order.orderNumber}</span>
                  <span className="order-date">Authorized on {new Date(order.placedAt).toLocaleDateString()}</span>
                </div>

                <div className="meta-right">
                  <span className={`status-tag status-${order.status.toLowerCase()}`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                  <span className="order-total-price">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="card-items-list">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <img src={item.image} alt={item.name} className="item-thumb" />
                    <div className="item-meta">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-spec">Variant: <strong>{item.colorName}</strong> • Qty: {item.quantity}</p>
                      <span className="item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Courier Tracking snippet */}
              {order.trackingNumber && (
                <div className="courier-snippet">
                  <Truck size={16} />
                  <span>
                    Dispatched via <strong>{order.courierName}</strong> | Tracking ID: <strong>{order.trackingNumber}</strong>
                  </span>
                </div>
              )}

              {/* Footer Actions */}
              <div className="card-footer-actions">
                <Link to={`/track-order/${order.id}`} className="btn btn-outline btn-sm">
                  Track Live Consignment <ChevronRight size={14} />
                </Link>

                {order.status !== 'RETURN_REQUESTED' && order.status !== 'RETURNED' && (
                  <button
                    onClick={() => setReturnModalOrder(order.id)}
                    className="btn btn-outline btn-sm return-btn"
                  >
                    <RotateCcw size={14} /> Initiate Return
                  </button>
                )}

                {order.status === 'RETURN_REQUESTED' && (
                  <span className="return-active-pill">
                    Return Pickup Scheduled: {order.returnReason}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Return Request Modal */}
      {returnModalOrder && (
        <div className="modal-backdrop" onClick={() => setReturnModalOrder(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Initiate Doorstep Return</h3>
              <button onClick={() => setReturnModalOrder(null)} className="close-btn"><X size={18} /></button>
            </div>
            <form onSubmit={handleReturnSubmit} className="modal-form">
              <label>Reason for Return</label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="reason-select"
              >
                <option value="Size/Capacity incompatible with my everyday needs">Size/Capacity incompatible with my everyday needs</option>
                <option value="Laptop compartment didn't fit my specific machine">Laptop compartment didn't fit my specific machine</option>
                <option value="Color shade differs slightly from online depiction">Color shade differs slightly from online depiction</option>
                <option value="Prefer a different bag form factor / model">Prefer a different bag form factor / model</option>
              </select>

              <div className="return-policy-note">
                <p>
                  <strong>Doorstep Quality Check:</strong> Please ensure all original tags, dust pouches, and shoulder straps are intact. Reverse pickup is complimentary for Gold members.
                </p>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setReturnModalOrder(null)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Reverse Pickup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

