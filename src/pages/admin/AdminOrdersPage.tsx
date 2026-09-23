import React, { useState } from 'react';
import { Package, Search, Filter, Truck, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { useToastStore } from '../../store/useToastStore';
import { useAdminStore } from '../../store/useAdminStore';
import { OrderStatus } from '../../types';
import './AdminOrdersPage.scss';

export const AdminOrdersPage: React.FC = () => {
  const orders = useOrderStore((s) => s.orders);
  const updateOrderStatus = useOrderStore((s) => s.updateOrderStatus);
  const addToast = useToastStore((s) => s.addToast);
  const addAuditLog = useAdminStore((s) => s.addAuditLog);

  const [searchId, setSearchId] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeModalOrder, setActiveModalOrder] = useState<any | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchId.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchId.toLowerCase()) ||
      o.shippingAddress.city.toLowerCase().includes(searchId.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    addAuditLog({
      adminName: 'Ashish Ojha',
      adminEmail: 'admin@velobags.com',
      action: 'UPDATE_ORDER_STATUS',
      targetEntity: `Order ID: ${orderId}`,
      details: `Status escalated to ${newStatus}`,
      ipAddress: '127.0.0.1'
    });
    addToast({
      type: 'success',
      title: 'Order Status Updated',
      description: `Consignment is now marked as ${newStatus}`
    });
    if (activeModalOrder && activeModalOrder.id === orderId) {
      setActiveModalOrder({ ...activeModalOrder, status: newStatus });
    }
  };

  return (
    <div className="admin-orders-page">
      <div className="page-head-row">
        <div>
          <span className="pre-label">FULFILLMENT &amp; LOGISTICS</span>
          <h1 className="page-title">Order Consignments Queue ({orders.length})</h1>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="orders-filter-ribbon">
        <div className="search-input-box">
          <Search size={16} className="icon" />
          <input
            type="text"
            placeholder="Search by Order reference, customer, or city..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>

        <div className="status-select-wrap">
          <Filter size={14} />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Lifecycles</option>
            <option value="PLACED">Placed</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PACKED">Packed</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="RETURN_REQUESTED">Return Requested</option>
          </select>
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="orders-table-card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items &amp; Volumes</th>
              <th>Consignment Total</th>
              <th>Payment</th>
              <th>Current Status</th>
              <th>Fulfillment Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id}>
                <td className="cell-id">
                  <strong>{o.orderNumber}</strong>
                  <span className="date-sub">{new Date(o.placedAt).toLocaleDateString()}</span>
                </td>
                <td>
                  <div className="cell-cust">
                    <span className="name">{o.customerName}</span>
                    <span className="dest">{o.shippingAddress.city}, {o.shippingAddress.state}</span>
                  </div>
                </td>
                <td>
                  <div className="cell-items-stack">
                    {o.items.map((i, idx) => (
                      <span key={idx} className="item-row">
                        {i.quantity}x {i.name} ({i.colorName})
                      </span>
                    ))}
                  </div>
                </td>
                <td className="cell-amount">
                  <strong>₹{o.totalAmount.toLocaleString('en-IN')}</strong>
                </td>
                <td>
                  <span className="pay-badge">{o.paymentMethod}</span>
                </td>
                <td>
                  <select
                    className={`select-status-inline status-${o.status.toLowerCase()}`}
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                  >
                    <option value="PLACED">PLACED</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PACKED">PACKED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="RETURN_REQUESTED">RETURN REQUESTED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
                <td className="cell-action">
                  <button
                    onClick={() => setActiveModalOrder(o)}
                    className="btn-inspect"
                    title="Inspect Full Consignment"
                  >
                    <Eye size={15} /> Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspection Modal */}
      {activeModalOrder && (
        <div className="modal-backdrop" onClick={() => setActiveModalOrder(null)}>
          <div className="order-inspect-card" onClick={(e) => e.stopPropagation()}>
            <div className="inspect-head">
              <div>
                <span className="pre-tag">CONSIGNMENT DOSSIER</span>
                <h3>{activeModalOrder.orderNumber}</h3>
              </div>
              <button onClick={() => setActiveModalOrder(null)} className="close-btn">✕</button>
            </div>

            <div className="inspect-body">
              <div className="dossier-grid">
                <div className="dossier-col">
                  <h4>Delivery Recipient</h4>
                  <p><strong>{activeModalOrder.shippingAddress.fullName}</strong> ({activeModalOrder.customerPhone})</p>
                  <p>{activeModalOrder.shippingAddress.addressLine1}</p>
                  <p>{activeModalOrder.shippingAddress.city}, {activeModalOrder.shippingAddress.state} - {activeModalOrder.shippingAddress.pincode}</p>
                </div>

                <div className="dossier-col">
                  <h4>Logistics Information</h4>
                  <p>Courier: <strong>{activeModalOrder.courierName || 'BlueDart'}</strong></p>
                  <p>Air Waybill (AWB): <strong>{activeModalOrder.trackingNumber}</strong></p>
                  <p>Payment: <strong>{activeModalOrder.paymentMethod} ({activeModalOrder.paymentStatus})</strong></p>
                </div>
              </div>

              <div className="dossier-items">
                <h4>Packaged Carry Gears</h4>
                {activeModalOrder.items.map((i: any, idx: number) => (
                  <div key={idx} className="item-line">
                    <img src={i.image} alt={i.name} />
                    <div>
                      <strong>{i.name}</strong>
                      <p>Color: {i.colorName} • Qty: {i.quantity} • Unit Price: ₹{i.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

