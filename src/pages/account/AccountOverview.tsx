import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, Award, Tag, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';
import './AccountOverview.scss';

export const AccountOverview: React.FC = () => {
  const { customer } = useAuthStore();
  const orders = useOrderStore((s) => s.getUserOrders(customer?.id || 'cust-01'));
  const wishlist = useWishlistStore((s) => s.items);

  const activeOrders = orders.filter((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');
  const deliveredOrders = orders.filter((o) => o.status === 'DELIVERED');

  return (
    <div className="account-overview-page">
      <div className="overview-head">
        <h2 className="heading-2">Collector Dashboard</h2>
        <p className="lead-text">Manage your active orders, expedited warranty claims, and loyalty perks.</p>
      </div>

      {/* KPI Metric Cards */}
      <div className="overview-kpis-grid">
        <Link to="/account/orders" className="kpi-card">
          <div className="kpi-icon-wrap">
            <Package size={22} />
          </div>
          <div className="kpi-data">
            <span className="kpi-val">{orders.length}</span>
            <span className="kpi-label">Lifetime Orders</span>
          </div>
        </Link>

        <Link to="/account/wishlist" className="kpi-card">
          <div className="kpi-icon-wrap">
            <Heart size={22} />
          </div>
          <div className="kpi-data">
            <span className="kpi-val">{wishlist.length}</span>
            <span className="kpi-label">Saved Wishlist</span>
          </div>
        </Link>

        <Link to="/account/rewards" className="kpi-card">
          <div className="kpi-icon-wrap">
            <Award size={22} />
          </div>
          <div className="kpi-data">
            <span className="kpi-val">{customer?.loyaltyPoints || 1240}</span>
            <span className="kpi-label">Carry Points</span>
          </div>
        </Link>

        <Link to="/account/coupons" className="kpi-card">
          <div className="kpi-icon-wrap">
            <Tag size={22} />
          </div>
          <div className="kpi-data">
            <span className="kpi-val">3 Active</span>
            <span className="kpi-label">Available Coupons</span>
          </div>
        </Link>
      </div>

      {/* Recent Orders Spotlight */}
      <div className="overview-section">
        <div className="section-head-row">
          <h3 className="section-title">Active &amp; Recent Consignments</h3>
          <Link to="/account/orders" className="see-all-link">
            View All Orders ({orders.length}) <ArrowRight size={14} />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <p>You have not placed any orders yet.</p>
            <Link to="/products" className="btn btn-primary btn-sm mt-3">Start Exploring</Link>
          </div>
        ) : (
          <div className="recent-orders-list">
            {orders.slice(0, 2).map((order) => (
              <div key={order.id} className="recent-order-card">
                <div className="order-head">
                  <div>
                    <span className="order-id">{order.orderNumber}</span>
                    <span className="order-date">Placed on {new Date(order.placedAt).toLocaleDateString()}</span>
                  </div>
                  <span className={`status-pill status-${order.status.toLowerCase()}`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="order-items-preview">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="preview-item">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h4 className="item-title">{item.name}</h4>
                        <p className="item-details">Qty: {item.quantity} • {item.colorName}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <span className="order-total">
                    Total: <strong>₹{order.totalAmount.toLocaleString('en-IN')}</strong>
                  </span>
                  <div className="order-actions">
                    <Link to={`/track-order/${order.id}`} className="btn btn-outline btn-sm">
                      Track Consignment
                    </Link>
                    <Link to="/account/orders" className="btn btn-primary btn-sm">
                      Order Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

