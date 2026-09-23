import React from 'react';
import { Boxes, AlertTriangle, ArrowUpRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useToastStore } from '../../store/useToastStore';
import { useAdminStore } from '../../store/useAdminStore';
import './AdminInventoryPage.scss';

export const AdminInventoryPage: React.FC = () => {
  const products = useProductStore((s) => s.products);
  const updateStock = useProductStore((s) => s.updateStock);
  const addToast = useToastStore((s) => s.addToast);
  const addAuditLog = useAdminStore((s) => s.addAuditLog);

  const handleQuickRestock = (productId: string, variantId: string, name: string) => {
    updateStock(productId, variantId, 25);
    addAuditLog({
      adminName: 'Ashish Ojha',
      adminEmail: 'admin@velobags.com',
      action: 'RESTOCK_INVENTORY',
      targetEntity: `SKU: ${productId}`,
      details: `Dispatched replenish batch: +25 units for ${name}`,
      ipAddress: '127.0.0.1'
    });
    addToast({
      type: 'success',
      title: 'Inventory Restocked',
      description: `Added +25 units to ${name}.`
    });
  };

  return (
    <div className="admin-inventory-page">
      <div className="page-head-row">
        <div>
          <span className="pre-label">SUPPLY CHAIN &amp; WAREHOUSE</span>
          <h1 className="page-title">Inventory Forecasting &amp; Replenishment</h1>
        </div>
      </div>

      {/* Stock Health Alerts */}
      <div className="inventory-summary-cards">
        <div className="inv-card">
          <span className="inv-label">Total Stocked Volume</span>
          <h3 className="inv-val">
            {products.reduce((acc, p) => acc + p.totalStock, 0)} Units
          </h3>
          <span className="inv-sub">Across 9 bag categories</span>
        </div>

        <div className="inv-card warning">
          <span className="inv-label">Low Stock Warnings</span>
          <h3 className="inv-val">
            {products.filter((p) => p.totalStock < 20).length} SKUs
          </h3>
          <span className="inv-sub">Under 20 units remaining</span>
        </div>

        <div className="inv-card">
          <span className="inv-label">Estimated Days of Supply</span>
          <h3 className="inv-val">26 Days</h3>
          <span className="inv-sub">At current 18.4% weekly run rate</span>
        </div>
      </div>

      {/* Dense Inventory Forecasting Grid */}
      <div className="inventory-table-card">
        <table className="inv-table">
          <thead>
            <tr>
              <th>SKU Reference</th>
              <th>Product Model</th>
              <th>Available Units</th>
              <th>Daily Burn Rate</th>
              <th>Runway Days Remaining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const v = p.variants[0];
              const dailyBurn = Math.max(1, Math.round(p.totalStock / 24));
              const daysLeft = Math.round(p.totalStock / dailyBurn);
              const isUrgent = daysLeft < 15;

              return (
                <tr key={p.id}>
                  <td className="cell-sku">{v?.sku}</td>
                  <td>
                    <div className="cell-name-box">
                      <strong>{p.name}</strong>
                      <span>{p.brand} • {p.category}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`stock-count ${isUrgent ? 'urgent' : ''}`}>
                      {p.totalStock} units
                    </span>
                  </td>
                  <td className="cell-burn">~{dailyBurn} units / day</td>
                  <td>
                    <span className={`runway-pill ${isUrgent ? 'urgent' : ''}`}>
                      {daysLeft} days
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleQuickRestock(p.id, v.id, p.name)}
                      className="btn-restock"
                    >
                      <RotateCcw size={13} /> Restock +25
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

