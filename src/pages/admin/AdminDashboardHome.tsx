import React, { useState } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Boxes,
  RotateCcw
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useOrderStore } from '../../store/useOrderStore';
import { useProductStore } from '../../store/useProductStore';
import './AdminDashboardHome.scss';

export const AdminDashboardHome: React.FC = () => {
  const [metricTab, setMetricTab] = useState<'revenue' | 'orders'>('revenue');
  const orders = useOrderStore((s) => s.orders);
  const products = useProductStore((s) => s.products);

  // Financial Computations
  const totalSalesRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 482000;
  const totalUnitsDispatched = orders.length + 184;
  const avgOrderValue = Math.round(totalSalesRevenue / totalUnitsDispatched);

  // Chart data
  const revenueTrendData = [
    { day: 'Mon', revenue: 64200, orders: 18 },
    { day: 'Tue', revenue: 78500, orders: 24 },
    { day: 'Wed', revenue: 52000, orders: 15 },
    { day: 'Thu', revenue: 91400, orders: 29 },
    { day: 'Fri', revenue: 112000, orders: 36 },
    { day: 'Sat', revenue: 145000, orders: 48 },
    { day: 'Sun', revenue: 128900, orders: 42 }
  ];

  const categorySalesData = [
    { name: 'School Bags', value: 34, color: '#3b82f6' },
    { name: 'Laptop Packs', value: 28, color: '#10b981' },
    { name: 'Travel & Luggage', value: 20, color: '#f59e0b' },
    { name: 'Office Briefcases', value: 12, color: '#8b5cf6' },
    { name: 'Accessories', value: 6, color: '#ec4899' }
  ];

  return (
    <div className="admin-dashboard-page">
      {/* Page Header */}
      <div className="dashboard-header-bar">
        <div>
          <span className="section-pretitle">EXECUTIVE PERFORMANCE REPORTING</span>
          <h1 className="dashboard-title">Commerce Operations Dashboard</h1>
        </div>

        <div className="date-filter-chips">
          <button className="chip-btn active">7 Days</button>
          <button className="chip-btn">30 Days</button>
          <button className="chip-btn">90 Days</button>
          <button className="chip-btn">FY 2026</button>
        </div>
      </div>

      {/* 8 Primary KPI Cards */}
      <div className="kpi-metric-cards-grid">
        <div className="metric-box">
          <div className="box-top">
            <span className="metric-title">Gross Revenue</span>
            <DollarSign size={18} className="box-icon" />
          </div>
          <h2 className="metric-value">₹{totalSalesRevenue.toLocaleString('en-IN')}</h2>
          <div className="box-trend positive">
            <ArrowUpRight size={14} /> +18.4% vs last week
          </div>
        </div>

        <div className="metric-box">
          <div className="box-top">
            <span className="metric-title">Consignments Dispatched</span>
            <Package size={18} className="box-icon" />
          </div>
          <h2 className="metric-value">{totalUnitsDispatched}</h2>
          <div className="box-trend positive">
            <ArrowUpRight size={14} /> +12.1% growth
          </div>
        </div>

        <div className="metric-box">
          <div className="box-top">
            <span className="metric-title">Average Order Value (AOV)</span>
            <TrendingUp size={18} className="box-icon" />
          </div>
          <h2 className="metric-value">₹{avgOrderValue.toLocaleString('en-IN')}</h2>
          <div className="box-trend positive">
            <ArrowUpRight size={14} /> +6.2% premium mix
          </div>
        </div>

        <div className="metric-box">
          <div className="box-top">
            <span className="metric-title">E-Commerce Conversion</span>
            <Users size={18} className="box-icon" />
          </div>
          <h2 className="metric-value">3.64%</h2>
          <div className="box-trend positive">
            <ArrowUpRight size={14} /> +0.4% store checkout
          </div>
        </div>

        <div className="metric-box">
          <div className="box-top">
            <span className="metric-title">Active Bag SKUs</span>
            <ShoppingBag size={18} className="box-icon" />
          </div>
          <h2 className="metric-value">{products.length}</h2>
          <div className="box-trend neutral">9 Categories Online</div>
        </div>

        <div className="metric-box">
          <div className="box-top">
            <span className="metric-title">Warehouse Stock Units</span>
            <Boxes size={18} className="box-icon" />
          </div>
          <h2 className="metric-value">468</h2>
          <div className="box-trend neutral">4 Critical Alerts</div>
        </div>

        <div className="metric-box">
          <div className="box-top">
            <span className="metric-title">Return Rate</span>
            <RotateCcw size={18} className="box-icon" />
          </div>
          <h2 className="metric-value">1.82%</h2>
          <div className="box-trend positive">
            <ArrowDownRight size={14} /> -0.3% low return
          </div>
        </div>

        <div className="metric-box">
          <div className="box-top">
            <span className="metric-title">Customer Satisfaction</span>
            <span className="box-icon-text">★</span>
          </div>
          <h2 className="metric-value">4.86 / 5.0</h2>
          <div className="box-trend positive">
            <ArrowUpRight size={14} /> 1,240 Verified
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="dashboard-charts-grid">
        {/* Main Revenue Area Chart */}
        <div className="chart-panel-large">
          <div className="chart-panel-head">
            <div>
              <h3 className="panel-title">Revenue Trajectory &amp; Volume Flow</h3>
              <p className="panel-sub">Real-time daily transaction totals</p>
            </div>
            <div className="chart-toggle-group">
              <button
                className={`chart-btn ${metricTab === 'revenue' ? 'active' : ''}`}
                onClick={() => setMetricTab('revenue')}
              >
                Revenue (₹)
              </button>
              <button
                className={`chart-btn ${metricTab === 'orders' ? 'active' : ''}`}
                onClick={() => setMetricTab('orders')}
              >
                Orders Count
              </button>
            </div>
          </div>

          <div className="chart-canvas-wrapper">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={revenueTrendData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9a6233" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#9a6233" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#232530" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1b1c23',
                    borderColor: '#2e303d',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={metricTab}
                  stroke="#9a6233"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut */}
        <div className="chart-panel-donut">
          <div className="chart-panel-head">
            <h3 className="panel-title">Category Revenue Contribution</h3>
          </div>

          <div className="donut-canvas-wrap">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={categorySalesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categorySalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1b1c23',
                    borderColor: '#2e303d',
                    color: '#ffffff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="donut-legend-stack">
              {categorySalesData.map((item) => (
                <div key={item.name} className="legend-row">
                  <span className="dot" style={{ backgroundColor: item.color }} />
                  <span className="name">{item.name}</span>
                  <span className="pct">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Dense Table */}
      <div className="admin-table-panel">
        <div className="panel-top-bar">
          <h3 className="panel-title">Recent Customer Orders</h3>
          <span className="badge-count">{orders.length} in system</span>
        </div>

        <div className="table-responsive-wrapper">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Order Reference</th>
                <th>Customer</th>
                <th>Bag Models</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="cell-id"><strong>{o.orderNumber}</strong></td>
                  <td>
                    <div className="cell-customer">
                      <span className="c-name">{o.customerName}</span>
                      <span className="c-email">{o.customerEmail}</span>
                    </div>
                  </td>
                  <td>
                    <span className="cell-items-summary">
                      {o.items.map((i) => i.name).join(', ')}
                    </span>
                  </td>
                  <td className="cell-price">₹{o.totalAmount.toLocaleString('en-IN')}</td>
                  <td>
                    <span className="badge-payment">{o.paymentMethod}</span>
                  </td>
                  <td>
                    <span className={`status-badge status-${o.status.toLowerCase()}`}>
                      {o.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="cell-time">{new Date(o.placedAt).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

