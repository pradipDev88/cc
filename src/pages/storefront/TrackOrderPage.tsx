import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import './TrackOrderPage.scss';

export const TrackOrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchId, setSearchId] = useState(id || '');
  const getOrderById = useOrderStore((s) => s.getOrderById);

  const order = getOrderById(searchId) || getOrderById('ord-1001');

  const stepsOrder = ['PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const currentStepIndex = stepsOrder.indexOf(order?.status || 'SHIPPED');

  return (
    <div className="track-order-page container">
      {/* Search Bar */}
      <div className="track-header-card">
        <span className="track-eyebrow">LIVE CONSIGNMENT LOGISTICS</span>
        <h1 className="heading-1">Track Consignment</h1>
        <p className="track-desc">Enter your VLO Order Number or Consignment Tracking Waybill.</p>

        <form onSubmit={(e) => e.preventDefault()} className="track-search-form">
          <input
            type="text"
            placeholder="e.g. VLO-88219"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Track Status
          </button>
        </form>
      </div>

      {order && (
        <div className="track-content-grid">
          {/* Timeline View */}
          <div className="timeline-card">
            <div className="timeline-meta-bar">
              <div>
                <span className="meta-label">Consignment</span>
                <h3 className="order-num">{order.orderNumber}</h3>
              </div>
              <div>
                <span className="meta-label">Courier Logistics</span>
                <p className="courier-val">{order.courierName} ({order.trackingNumber})</p>
              </div>
              <div>
                <span className="meta-label">Estimated Delivery</span>
                <p className="eta-val">{order.estimatedDelivery}</p>
              </div>
            </div>

            {/* Stepper Dots */}
            <div className="horizontal-stepper">
              {stepsOrder.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={step} className={`step-item ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''}`}>
                    <div className="step-circle">
                      {isPassed ? <CheckCircle2 size={16} /> : idx + 1}
                    </div>
                    <span className="step-name">{step.replace(/_/g, ' ')}</span>
                  </div>
                );
              })}
            </div>

            {/* Detailed Timeline Events */}
            <div className="events-vertical-list">
              <h4 className="events-heading">Consignment Event Log</h4>
              {order.timeline.map((event, idx) => (
                <div key={idx} className="event-row">
                  <div className="event-marker">
                    <span className="marker-dot" />
                    {idx < order.timeline.length - 1 && <span className="marker-line" />}
                  </div>
                  <div className="event-details">
                    <div className="event-head">
                      <h5 className="event-title">{event.title}</h5>
                      <span className="event-time">{event.timestamp}</span>
                    </div>
                    <p className="event-desc">{event.description}</p>
                    {event.location && (
                      <span className="event-location">
                        <MapPin size={13} /> {event.location}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consignment Items Summary */}
          <div className="order-items-sidebar">
            <h4 className="side-title">Package Contents</h4>
            <div className="side-items-list">
              {order.items.map((item, idx) => (
                <div key={idx} className="side-item-row">
                  <img src={item.image} alt={item.name} className="side-item-thumb" />
                  <div className="side-item-meta">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">Qty: {item.quantity} • {item.colorName}</span>
                    <span className="item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="delivery-destination-box">
              <span className="dest-label">Delivery Destination:</span>
              <p><strong>{order.shippingAddress.fullName}</strong></p>
              <p>{order.shippingAddress.addressLine1}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

