import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  Tag,
  Image,
  Sliders,
  BarChart3,
  FileText,
  ShieldAlert,
  Search,
  LogOut,
  Bell,
  Command,
  Plus,
  Boxes
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { ToastContainer } from '../components/common/ToastContainer';
import './AdminLayout.scss';

export const AdminLayout: React.FC = () => {
  const { admin, isAdminAuthenticated, adminLogout } = useAuthStore();
  const [cmdKOpen, setCmdKOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState('');
  const [mobileAdminNavOpen, setMobileAdminNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdKOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Strict Protection: If not authenticated, show strictly AdminLoginPage
  if (!isAdminAuthenticated || !admin) {
    return <AdminLoginPage />;
  }

  const navGroups = [
    {
      group: 'Core Operations',
      items: [
        { label: 'Executive Overview', to: '/admin', icon: <LayoutDashboard size={18} /> },
        { label: 'Fulfillment & Orders', to: '/admin/orders', icon: <Package size={18} /> },
        { label: 'Catalog & Products', to: '/admin/products', icon: <ShoppingBag size={18} /> },
        { label: 'Inventory & Forecasting', to: '/admin/inventory', icon: <Boxes size={18} /> }
      ]
    },
    {
      group: 'Marketing & CMS',
      items: [
        { label: 'Promotional Coupons', to: '/admin/coupons', icon: <Tag size={18} /> },
        { label: 'Homepage Banners CMS', to: '/admin/banners', icon: <Image size={18} /> },
        { label: 'Audience CRM', to: '/admin/customers', icon: <Users size={18} /> }
      ]
    },
    {
      group: 'System & Governance',
      items: [
        { label: 'Audit Security Logs', to: '/admin/audit-logs', icon: <ShieldAlert size={18} /> },
        { label: 'Platform Settings', to: '/admin/settings', icon: <Sliders size={18} /> }
      ]
    }
  ];

  const quickActions = [
    { title: 'Create New Product', link: '/admin/products/new' },
    { title: 'View Orders Pending Fulfillment', link: '/admin/orders' },
    { title: 'Check Low Inventory Stock', link: '/admin/inventory' },
    { title: 'Manage Promotional Coupons', link: '/admin/coupons' },
    { title: 'Edit Hero Banners', link: '/admin/banners' },
    { title: 'Security Audit Trail', link: '/admin/audit-logs' }
  ];

  const filteredActions = quickActions.filter((a) =>
    a.title.toLowerCase().includes(cmdSearch.toLowerCase())
  );

  return (
    <div className="admin-command-shell">
      {/* Dark SaaS Sidebar */}
      {mobileAdminNavOpen && (
        <div className="admin-mobile-backdrop" onClick={() => setMobileAdminNavOpen(false)} />
      )}
      <aside className={`admin-side-navigation ${mobileAdminNavOpen ? 'mobile-open' : ''}`}>
        <div className="admin-brand-header">
          <div className="brand-logo-stack">
            <span className="logo-main">VELO &amp; CO.</span>
            <span className="role-chip">{admin.role.replace('_', ' ')}</span>
          </div>
          <button className="admin-mobile-close" onClick={() => setMobileAdminNavOpen(false)}>
            ✕
          </button>
        </div>

        <div className="admin-nav-scroll">
          {navGroups.map((grp) => (
            <div key={grp.group} className="nav-group-section">
              <span className="group-title">{grp.group}</span>
              <div className="group-links">
                {grp.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/admin'}
                    onClick={() => setMobileAdminNavOpen(false)}
                    className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="link-icon">{item.icon}</span>
                    <span className="link-text">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User Card */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <img src={admin.avatar} alt={admin.name} className="user-avatar" />
            <div className="user-text">
              <span className="user-fullname">{admin.name}</span>
              <span className="user-role">{admin.email}</span>
            </div>
          </div>
          <button onClick={adminLogout} className="admin-logout-btn" title="Sign out of Console">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Administrative Pane */}
      <div className="admin-main-viewport">
        {/* Top Operational Bar */}
        <header className="admin-top-bar">
          <button
            className="admin-hamburger-btn"
            onClick={() => setMobileAdminNavOpen(true)}
            aria-label="Open Admin Menu"
          >
            ☰
          </button>

          <div className="cmd-search-trigger" onClick={() => setCmdKOpen(true)}>
            <Search size={16} className="search-icon" />
            <span className="trigger-text">Search catalog, orders, SKU, customers...</span>
            <kbd className="cmd-kbd">⌘K</kbd>
          </div>

          <div className="top-bar-actions">
            <button
              onClick={() => navigate('/admin/products/new')}
              className="btn-create-quick"
            >
              <Plus size={16} /> Add Product
            </button>
            <div className="admin-notification-bell">
              <Bell size={18} />
              <span className="bell-badge" />
            </div>
          </div>
        </header>

        {/* Dynamic Nested Route Content */}
        <main className="admin-page-canvas">
          <Outlet />
        </main>
      </div>

      {/* Global Command Center (Cmd+K) Modal */}
      {cmdKOpen && (
        <div className="cmd-palette-backdrop" onClick={() => setCmdKOpen(false)}>
          <div className="cmd-palette-card" onClick={(e) => e.stopPropagation()}>
            <div className="cmd-input-bar">
              <Command size={20} className="cmd-icon" />
              <input
                type="text"
                placeholder="Type a command or jump to screen..."
                value={cmdSearch}
                onChange={(e) => setCmdSearch(e.target.value)}
                autoFocus
              />
            </div>

            <div className="cmd-options-list">
              <span className="options-heading">Suggested Actions</span>
              {filteredActions.map((action, idx) => (
                <button
                  key={idx}
                  className="cmd-item"
                  onClick={() => {
                    navigate(action.link);
                    setCmdKOpen(false);
                  }}
                >
                  <span>{action.title}</span>
                  <kbd>Jump &rarr;</kbd>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

