import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight, ShieldCheck, Clock, TrendingUp } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useProductStore } from '../../store/useProductStore';
import './Header.scss';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Exact elements from the reference image
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Cashmere Overcoat',
    'Titanium Headphones',
    'Calfskin Bag',
    'Chronograph',
  ]);

  const trendingDiscoveries = [
    'Cashmere Overcoat',
    'Chronograph Calibre 1888',
    'Silk Midi Dress',
    'Suede Chelsea Boots',
    'Titanium Headphones',
  ];

  const curatedCategories = [
    {
      title: 'NEW ARRIVALS',
      path: '/products',
      img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'MEN',
      path: '/category/backpacks',
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'WOMEN',
      path: '/category/handbags',
      img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'ELECTRONICS',
      path: '/category/laptop-bags',
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'ACCESSORIES',
      path: '/category/accessories',
      img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'HOME & LIVING',
      path: '/products',
      img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'BEAUTY',
      path: '/category/accessories',
      img: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=400&auto=format&fit=crop',
    },
  ];

  const totalCartCount = useCartStore((s) => s.getTotalItems());
  const setMiniCartOpen = useCartStore((s) => s.setMiniCartOpen);
  const wishlistItems = useWishlistStore((s) => s.items);
  const { customer, isCustomerAuthenticated } = useAuthStore();
  const products = useProductStore((s) => s.products);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOverlayOpen) {
        setSearchOverlayOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOverlayOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      if (!recentSearches.includes(searchInput.trim())) {
        setRecentSearches((prev) => [searchInput.trim(), ...prev.slice(0, 4)]);
      }
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchOverlayOpen(false);
    }
  };

  const handleSelectQuery = (term: string) => {
    setSearchInput(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setSearchOverlayOpen(false);
  };

  const navCategories = [
    {
      title: 'School Bags',
      slug: 'school-bags',
      desc: 'Ergonomic, spine-safe & playful companions for students.',
      featuredImage: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=600&auto=format&fit=crop',
      subcategories: ['Ergonomic School Backpacks', 'Kids Bags', 'Character & Theme Packs', 'Water-Resistant Tiffin Bags']
    },
    {
      title: 'Backpacks',
      slug: 'backpacks',
      desc: 'Everyday campus, commuter & modular urban carry systems.',
      featuredImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
      subcategories: ['All Backpacks', 'College Daypacks', 'Minimalist Carry', 'Roll-top Backpacks']
    },
    {
      title: 'Laptop & Office',
      slug: 'laptop-bags',
      desc: 'TSA clamshell, anti-theft compartments & Italian leather briefcases.',
      featuredImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop',
      subcategories: ['Executive Laptop Bags', 'Leather Briefcases', 'Messenger Bags', 'Business Attache']
    },
    {
      title: 'Handbags & Slings',
      slug: 'handbags',
      desc: 'Sculptured vegan leather totes, crossbody slings & micro bags.',
      featuredImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
      subcategories: ['Structured Totes', 'Crossbody Bags', 'Modular Slings', 'Evening Clutches']
    },
    {
      title: 'Travel & Duffle',
      slug: 'travel-bags',
      desc: 'Hinomoto spinner luggage, expandable weekender duffles & organizers.',
      featuredImage: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=600&auto=format&fit=crop',
      subcategories: ['Weekender Duffles', 'Hard Shell Spinners', 'Cabin Trolleys', 'Travel Organizers']
    },
    {
      title: 'Exported',
      slug: 'exported',
      desc: 'International surplus & heavy-duty global specification bags.',
      featuredImage: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=600&auto=format&fit=crop',
      subcategories: ['Global Standard Backpacks', 'Export Surplus Travel Bags', 'Heavy-Duty Tech Packs', 'Military Grade Rucksacks']
    },
    {
      title: 'Generic',
      slug: 'generic',
      desc: 'Clean, unbranded essential backpacks & daily utility carry bags.',
      featuredImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
      subcategories: ['Plain Solid Backpacks', 'Minimalist Campus Bags', 'Daily Utility Packs', 'Budget Commuter Bags']
    }
  ];

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          {/* Luxury Brand Logo */}
          <Link to="/" className="brand-logo" aria-label="VELO CO. Home">
            <span className="brand-primary">VELO</span>
            <span className="brand-secondary">CO.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navCategories.map((cat) => (
                <li
                  key={cat.slug}
                  className={`nav-item ${activeMegaCategory === cat.slug ? 'active' : ''}`}
                  onMouseEnter={() => setActiveMegaCategory(cat.slug)}
                >
                  <Link to={`/category/${cat.slug}`} className="nav-link">
                    {cat.title}
                  </Link>
                </li>
              ))}
              <li className="nav-item">
                <Link to="/products?badge=SALE" className="nav-link nav-sale">
                  SALE
                </Link>
              </li>
            </ul>
          </nav>

          {/* Header Action Icons */}
          <div className="header-actions">
            <button
              className="action-btn"
              onClick={() => setSearchOverlayOpen(true)}
              aria-label="Search catalog"
            >
              <Search size={20} />
            </button>

            <Link
              to={isCustomerAuthenticated ? '/account' : '/account/login'}
              className="action-btn user-btn"
              aria-label="Customer account"
              title={customer ? `Signed in as ${customer.name}` : 'Sign in'}
            >
              <User size={20} />
              {customer && <span className="user-dot" />}
            </Link>

            <Link to="/wishlist" className="action-btn wishlist-btn" aria-label="Wishlist">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="action-badge">{wishlistItems.length}</span>
              )}
            </Link>

            <button
              className="action-btn cart-btn"
              onClick={() => setMiniCartOpen(true)}
              aria-label="Cart drawer"
            >
              <ShoppingBag size={20} />
              {totalCartCount > 0 && (
                <span className="action-badge">{totalCartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Full-Width Mega Menu Dropdown */}
        {activeMegaCategory && (
          <div
            className="mega-menu"
            onMouseEnter={() => setActiveMegaCategory(activeMegaCategory)}
            onMouseLeave={() => setActiveMegaCategory(null)}
          >
            {(() => {
              const activeCat = navCategories.find((c) => c.slug === activeMegaCategory);
              if (!activeCat) return null;
              return (
                <div className="mega-menu-inner container">
                  <div className="mega-links-col">
                    <span className="mega-heading">{activeCat.title} Categories</span>
                    <ul className="sub-links-list">
                      {activeCat.subcategories.map((sub) => (
                        <li key={sub}>
                          <Link
                            to={`/category/${activeCat.slug}?sub=${encodeURIComponent(sub)}`}
                            className="sub-link"
                            onClick={() => setActiveMegaCategory(null)}
                          >
                            {sub}
                          </Link>
                        </li>
                      ))}
                      <li className="all-view-link">
                        <Link
                          to={`/category/${activeCat.slug}`}
                          onClick={() => setActiveMegaCategory(null)}
                        >
                          View All {activeCat.title} <ArrowRight size={14} />
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mega-info-col">
                    <span className="mega-heading">Craftsmanship Notes</span>
                    <p className="mega-desc">{activeCat.desc}</p>
                    <div className="craft-badge">
                      <ShieldCheck size={16} /> 2-5 Year Comprehensive Warranty
                    </div>
                  </div>

                  <div className="mega-feature-card">
                    <img src={activeCat.featuredImage} alt={activeCat.title} className="mega-img" />
                    <div className="mega-card-overlay">
                      <span className="mega-curation-tag">Featured Selection</span>
                      <h4>Curated for You</h4>
                      <Link
                        to={`/category/${activeCat.slug}`}
                        className="mega-cta-link"
                        onClick={() => setActiveMegaCategory(null)}
                      >
                        Shop Collection <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </header>

      {/* Search Overlay Modal - Exact Layout Matching Reference Image */}
      {searchOverlayOpen && (
        <div className="search-overlay" onClick={() => setSearchOverlayOpen(false)}>
          <div className="search-box-modal" onClick={(e) => e.stopPropagation()}>
            {/* Search Input Bar with ESC shortcut badge */}
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                  type="text"
                  placeholder="Search prêt-à-porter, timepieces, fragrances, leathercraft..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  autoFocus
                />
              </form>
              <button
                className="search-esc-badge"
                onClick={() => setSearchOverlayOpen(false)}
                title="Press ESC to close"
                type="button"
              >
                ESC
              </button>
            </div>

            {/* Live Search Instant Results when query typed */}
            {searchInput.trim().length > 1 ? (
              <div className="search-instant-results">
                <div className="search-section-header">
                  <span className="section-title">MATCHING ITEMS</span>
                  <span className="results-count">
                    {products.filter((p) =>
                      p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                      p.category.toLowerCase().includes(searchInput.toLowerCase())
                    ).length} results
                  </span>
                </div>
                <div className="instant-grid">
                  {products
                    .filter((p) =>
                      p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                      p.category.toLowerCase().includes(searchInput.toLowerCase())
                    )
                    .slice(0, 6)
                    .map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.slug}`}
                        className="instant-item"
                        onClick={() => setSearchOverlayOpen(false)}
                      >
                        <img
                          src={item.variants[0]?.images[0]}
                          alt={item.name}
                          className="instant-thumb"
                        />
                        <div className="instant-meta">
                          <span className="instant-name">{item.name}</span>
                          <span className="instant-category">{item.category}</span>
                          <span className="instant-price">₹{item.currentPrice.toLocaleString('en-IN')}</span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ) : (
              /* Reference Image Layout Sections */
              <div className="search-sections-body">
                {/* 1. RECENT SEARCHES */}
                {recentSearches.length > 0 && (
                  <div className="search-group">
                    <div className="search-section-header">
                      <div className="section-header-title">
                        <Clock size={14} className="header-icon" />
                        <span>RECENT SEARCHES</span>
                      </div>
                      <button
                        type="button"
                        className="clear-btn"
                        onClick={() => setRecentSearches([])}
                      >
                        Clear
                      </button>
                    </div>
                    <div className="search-pills-row">
                      {recentSearches.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="search-pill recent-pill"
                          onClick={() => handleSelectQuery(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. TRENDING DISCOVERIES */}
                <div className="search-group">
                  <div className="search-section-header">
                    <div className="section-header-title">
                      <TrendingUp size={14} className="header-icon" />
                      <span>TRENDING DISCOVERIES</span>
                    </div>
                  </div>
                  <div className="search-pills-row">
                    {trendingDiscoveries.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="search-pill trending-pill"
                        onClick={() => handleSelectQuery(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. CURATED CATEGORIES */}
                <div className="search-group categories-group">
                  <div className="search-section-header">
                    <div className="section-header-title">
                      <span>CURATED CATEGORIES</span>
                    </div>
                  </div>
                  <div className="curated-categories-grid">
                    {curatedCategories.map((cat, idx) => (
                      <Link
                        key={idx}
                        to={cat.path}
                        className="curated-cat-card"
                        onClick={() => setSearchOverlayOpen(false)}
                      >
                        <img src={cat.img} alt={cat.title} className="cat-card-img" />
                        <div className="cat-card-overlay">
                          <span className="cat-card-title">{cat.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="drawer-title">VELO &amp; CO.</span>
              <button
                className="drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body">
              <ul className="drawer-nav-list">
                {navCategories.map((c) => (
                  <li key={c.slug} className="drawer-nav-item">
                    <Link
                      to={`/category/${c.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="drawer-nav-link"
                    >
                      <span>{c.title}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                ))}
                <li className="drawer-nav-item">
                  <Link
                    to="/products?badge=SALE"
                    onClick={() => setMobileMenuOpen(false)}
                    className="drawer-nav-link text-sale"
                  >
                    <span>Special Offers &amp; Sale</span>
                    <ArrowRight size={16} />
                  </Link>
                </li>
              </ul>

              <div className="drawer-account-section">
                <Link
                  to={isCustomerAuthenticated ? '/account' : '/account/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="drawer-account-link"
                >
                  <User size={18} />
                  <span>{customer ? `My Account (${customer.name})` : 'Sign In / Register'}</span>
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="drawer-account-link"
                >
                  <Heart size={18} />
                  <span>Wishlist ({wishlistItems.length})</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

