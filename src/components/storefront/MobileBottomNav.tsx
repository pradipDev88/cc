import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Search, Heart, User, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import './MobileBottomNav.scss';

export const MobileBottomNav: React.FC = () => {
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = useCartStore((s) => s.getTotalItems());
  const setMiniCartOpen = useCartStore((s) => s.setMiniCartOpen);

  return (
    <nav className="mobile-bottom-bar" aria-label="Mobile Navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}
      >
        <Home size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}
      >
        <Compass size={20} />
        <span>Shop</span>
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}
      >
        <Search size={20} />
        <span>Search</span>
      </NavLink>

      <NavLink
        to="/wishlist"
        className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}
      >
        <div className="icon-badge-box">
          <Heart size={20} />
          {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
        </div>
        <span>Wishlist</span>
      </NavLink>

      <button
        type="button"
        onClick={() => setMiniCartOpen(true)}
        className="bottom-nav-link"
        aria-label="Open cart"
      >
        <div className="icon-badge-box">
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
        </div>
        <span>Bag</span>
      </button>

      <NavLink
        to="/account"
        className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}
      >
        <User size={20} />
        <span>Account</span>
      </NavLink>
    </nav>
  );
};

