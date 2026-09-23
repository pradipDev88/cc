import React from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  Tag,
  Award,
  RotateCcw,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Header } from '../components/storefront/Header';
import { AnnouncementBar } from '../components/storefront/AnnouncementBar';
import { Footer } from '../components/storefront/Footer';
import { ToastContainer } from '../components/common/ToastContainer';
import './AccountLayout.scss';

export const AccountLayout: React.FC = () => {
  const { customer, customerLogout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    customerLogout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Overview', to: '/account', icon: <LayoutDashboard size={18} /> },
    { label: 'My Orders & Consignments', to: '/account/orders', icon: <Package size={18} /> },
    { label: 'Saved Wishlist', to: '/account/wishlist', icon: <Heart size={18} /> },
    { label: 'Delivery Addresses', to: '/account/addresses', icon: <MapPin size={18} /> },
    { label: 'My Rewards & Tier', to: '/account/rewards', icon: <Award size={18} /> },
    { label: 'Promotional Coupons', to: '/account/coupons', icon: <Tag size={18} /> },
    { label: 'Returns & Replacements', to: '/account/returns', icon: <RotateCcw size={18} /> },
    { label: 'Reviews & Ratings', to: '/account/reviews', icon: <MessageSquare size={18} /> },
    { label: 'Account Settings', to: '/account/settings', icon: <Settings size={18} /> }
  ];

  return (
    <div className="account-app-shell">
      <AnnouncementBar />
      <Header />

      <main className="account-viewport container">
        {/* Personalized Welcome Banner */}
        <div className="account-hero-banner">
          <div className="user-greeting">
            <span className="greeting-eyebrow">PREMIUM COLLECTOR PRIVILEGE</span>
            <h1 className="user-name">Welcome back, {customer?.name || 'Ashish'}</h1>
            <p className="user-email">{customer?.email || 'collector@velobags.com'}</p>
          </div>

          <div className="tier-badge-cluster">
            <div className="tier-pill">
              <Award size={16} />
              <span>{customer?.loyaltyTier || 'GOLD'} TIER MEMBER</span>
            </div>
            <span className="tier-points">{customer?.loyaltyPoints || 1240} Carry Miles Earned</span>
          </div>
        </div>

        {/* Dashboard Grid (Sidebar + Dynamic Outlet) */}
        <div className="account-grid">
          <aside className="account-sidebar">
            <nav className="account-nav-menu">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/account'}
                  className={({ isActive }) => `account-nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-text">{link.label}</span>
                  <ChevronRight size={14} className="nav-arrow" />
                </NavLink>
              ))}

              <button onClick={handleLogout} className="account-nav-item logout-btn">
                <LogOut size={18} />
                <span className="nav-text">Sign Out of Account</span>
              </button>
            </nav>
          </aside>

          {/* Main Account Dynamic Panel */}
          <section className="account-content-pane">
            <Outlet />
          </section>
        </div>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
};

