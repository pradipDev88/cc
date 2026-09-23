import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Compass, ShieldCheck, Zap, Sparkles, Layers, SlidersHorizontal } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useAdminStore } from '../../store/useAdminStore';
import { ProductCard } from '../../components/product/ProductCard';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { INITIAL_PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';
import './HomePage.scss';

// Reusable Auto/Interactive Product Card Slider Component
interface CardSliderProps {
  products: Product[];
  autoSlide?: boolean;
  intervalMs?: number;
}

const ProductCardSlider: React.FC<CardSliderProps> = ({ products, autoSlide = true, intervalMs = 3600 }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    return () => el.removeEventListener('scroll', checkScroll);
  }, [products]);

  // Autoplay functionality with smooth continuous loop and hover pause
  useEffect(() => {
    if (!autoSlide || isHovered || products.length <= 1) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScroll - 35) {
          // Smooth wrap-around back to start
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Advance by one card width
          scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [autoSlide, isHovered, intervalMs, products.length]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="card-slider-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        type="button"
        onClick={() => handleScroll('left')} 
        className={`slider-nav-btn prev ${canScrollLeft ? 'visible' : ''}`}
        aria-label="Previous items"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="card-slider-track" ref={scrollRef}>
        {products.map((product) => (
          <div key={product.id} className="card-slider-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button 
        type="button"
        onClick={() => handleScroll('right')} 
        className={`slider-nav-btn next ${canScrollRight ? 'visible' : ''}`}
        aria-label="Next items"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const products = useProductStore((s) => s.products);
  const banners = useAdminStore((s) => s.banners);

  // Track global scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Curations - Guaranteed strictly 7 products for every slider
  const catalog = products && products.length >= INITIAL_PRODUCTS.length ? products : INITIAL_PRODUCTS;
  const bestSellers = catalog.filter((p) => p.isBestSeller).slice(0, 4);
  const schoolBags = catalog.filter((p) => p.category === 'school-bags').slice(0, 7);
  const officeBags = catalog.filter((p) => p.category === 'office-bags' || p.category === 'laptop-bags').slice(0, 7);
  const travelBags = catalog.filter((p) => p.category === 'travel-bags' || p.category === 'duffle-bags' || p.category === 'trolley-bags').slice(0, 7);
  const handbagBags = catalog.filter((p) => p.category === 'handbags' || p.category === 'sling-bags').slice(0, 7);

  const heroSlides = banners.length > 0 ? banners : [
    {
      id: 'h1',
      title: 'CARRY YOUR WORLD.',
      subtitle: 'Engineered for school, work, travel, and everything in between.',
      tagline: 'AUTUMN / WINTER 2026',
      ctaText: 'SHOP BACKPACKS',
      ctaLink: '/category/backpacks',
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=85&w=2560&auto=format&fit=crop'
    },
    {
      id: 'h2',
      title: 'EXECUTIVE PRECISION.',
      subtitle: 'TSA 180° layout, Italian pull-up leather & drop-tested laptop chambers.',
      tagline: 'MASTER ATELIER 2026',
      ctaText: 'SHOP OFFICE COLLECTION',
      ctaLink: '/category/office-bags',
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=85&w=2560&auto=format&fit=crop'
    },
    {
      id: 'h3',
      title: 'UNRESTRICTED EXPEDITIONS.',
      subtitle: 'Indestructible Makrolon® polycarbonate and ventilated weekender duffles.',
      tagline: 'NOMADIC RANGE',
      ctaText: 'SHOP TRAVEL & LUGGAGE',
      ctaLink: '/category/travel-bags',
      imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=85&w=2560&auto=format&fit=crop'
    }
  ];

  // Hero Autoplay with Pause on Hover
  useEffect(() => {
    if (isHeroHovered || heroSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHeroHovered, heroSlides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const categoryVisuals = [
    {
      title: 'School Bags',
      subtitle: 'Orthopedic & Ergonomic Support',
      slug: 'school-bags',
      count: '14 Models',
      image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=800&auto=format&fit=crop',
      badge: 'Back to School'
    },
    {
      title: 'Laptop Bags',
      subtitle: 'TSA 180° & Tech Partitioning',
      slug: 'laptop-bags',
      count: '18 Models',
      image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop',
      badge: 'Drop-Tested'
    },
    {
      title: 'Office Briefcases',
      subtitle: 'Full-Grain Tuscan Pull-Up Leather',
      slug: 'office-bags',
      count: '9 Models',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
      badge: 'Executive'
    },
    {
      title: 'Sculpted Handbags',
      subtitle: 'Structured Architectural Totes',
      slug: 'handbags',
      count: '12 Models',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
      badge: 'Atelier Edition'
    },
    {
      title: 'Modular Slings',
      subtitle: 'Magnetic Quick-Release Chest Packs',
      slug: 'sling-bags',
      count: '11 Models',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
      badge: 'Urban Mobility'
    },
    {
      title: 'Travel & Luggage',
      subtitle: 'Hinomoto Spinners & Duffles',
      slug: 'travel-bags',
      count: '16 Models',
      image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=800&auto=format&fit=crop',
      badge: 'Indestructible'
    }
  ];

  return (
    <div className="homepage-view">
      {/* Luxury Real-Time Scroll Progress Line */}
      <div 
        className="home-scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* 1. HERO CAMPAIGN SLIDER WITH AUTOPLAY & HOVER PAUSE (LEFT ALIGNED TEXT) */}
      <section 
        className="hero-slider-section"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        <div className="slider-wrapper">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              <div className="hero-overlay" />
              <div className="container hero-container-flex">
                <div className="hero-content-box">
                  <span className="hero-tagline">{slide.tagline || 'PREMIUM CARRY SYSTEMS'}</span>
                  <h1 className="hero-headline">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>

                  <div className="hero-btn-group">
                    <Link to={slide.ctaLink || '/products'} className="btn btn-primary btn-lg">
                      {slide.ctaText || 'EXPLORE COLLECTION'} <ArrowRight size={18} />
                    </Link>
                    <Link to="/products?badge=BESTSELLER" className="btn btn-secondary btn-lg hero-btn-light">
                      VIEW BEST SELLERS
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom Bar: Indicator lines on the left, circular arrow buttons on the right */}
          <div className="hero-bottom-bar container">
            <div className="hero-indicators">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`hero-indicator-dot ${idx === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {heroSlides.length > 1 && (
              <div className="slider-arrows">
                <button onClick={handlePrevSlide} className="arrow-btn" aria-label="Previous slide">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={handleNextSlide} className="arrow-btn" aria-label="Next slide">
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL TAXONOMY ("Shop by Carry Form") - LUXURY CATEGORY GRID */}
      <ScrollReveal animation="heavy-lift" staggerChildren={true}>
        <section className="section-category-grid container">
          <div className="section-head text-center">
            <span className="section-eyebrow">ARCHITECTURAL TAXONOMY</span>
            <h2 className="heading-1">Shop by Carry Form</h2>
            <p className="section-lead">Explore precision bags engineered for your exact operational environment.</p>
          </div>

          <div className="category-tiles-grid">
            {categoryVisuals.map((cat) => (
              <Link to={`/category/${cat.slug}`} key={cat.slug} className="category-tile-card stagger-item">
                <div className="cat-card-media">
                  <img src={cat.image} alt={cat.title} className="category-img" loading="lazy" />
                  <span className="cat-badge-chip">{cat.badge}</span>
                </div>
                <div className="category-card-overlay">
                  <div className="cat-meta-top">
                    <span className="cat-count">{cat.count}</span>
                    <span className="cat-icon-tag"><Layers size={14} /></span>
                  </div>
                  <h3 className="cat-title">{cat.title}</h3>
                  <p className="cat-subtitle">{cat.subtitle}</p>
                  <div className="cat-action-row">
                    <span className="cat-action">Explore Collection</span>
                    <ArrowRight size={15} className="cat-arrow" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 3. SCHOOL BAG CARD SLIDER ("READY FOR EVERY SCHOOL DAY") */}
      <ScrollReveal animation="slide-up">
        <section className="section-school-spotlight">
          <div className="container">
            <div className="spotlight-header-row">
              <div>
                <span className="section-eyebrow highlight">BACK TO ACADEMICS</span>
                <h2 className="heading-1">Ready for Every School Day</h2>
                <p className="section-lead">Spine-protective orthopedic cushioning and high-density waterproof shell fabrics.</p>
              </div>
              <Link to="/category/school-bags" className="btn btn-outline">
                Shop All School Bags ({schoolBags.length}) <ArrowRight size={16} />
              </Link>
            </div>

            <ProductCardSlider products={schoolBags} autoSlide={true} intervalMs={3600} />
          </div>
        </section>
      </ScrollReveal>

      {/* 4. EDITORIAL ASYMMETRIC PRODUCT LAYOUT (MAGAZINE HERO) */}
      <ScrollReveal animation="fade-zoom">
        <section className="editorial-magazine-section container">
          <div className="editorial-grid">
            <div className="editorial-hero-banner">
              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
                alt="Atelier Craft"
                className="editorial-img"
              />
              <div className="editorial-banner-content">
                <span className="editorial-pill">MASTER ATELIER</span>
                <h2 className="editorial-title">Tuscan Full-Grain Vegetable Tanned Leather</h2>
                <p className="editorial-desc">
                  Cut by hand in small artisan batches. Built to develop a unique patina over decades of transatlantic flights and boardroom negotiations.
                </p>
                <Link to="/category/office-bags" className="btn btn-primary">
                  Explore Atelier Series <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="editorial-side-products">
              <h3 className="side-title">Curated Tech Companions</h3>
              <div className="side-list">
                {officeBags.slice(0, 2).map((p) => (
                  <div key={p.id} className="side-item">
                    <img src={p.variants[0]?.images[0]} alt={p.name} className="side-thumb" />
                    <div className="side-meta">
                      <span className="side-category">{p.brand}</span>
                      <Link to={`/product/${p.slug}`} className="side-name">{p.name}</Link>
                      <span className="side-price">₹{p.currentPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 5. WORK & OFFICE COLLECTION CARD SLIDER ("WORK. ORGANIZED.") */}
      <ScrollReveal animation="heavy-lift">
        <section className="section-office-collection container">
          <div className="spotlight-header-row">
            <div>
              <span className="section-eyebrow">EXECUTIVE MOBILITY</span>
              <h2 className="heading-1">Work. Organized.</h2>
              <p className="section-lead">TSA-checkpoint compliant chambers, anti-theft zipper enclosures &amp; external USB-C ports.</p>
            </div>
            <Link to="/category/office-bags" className="btn btn-outline">
              Shop Office Collection ({officeBags.length}) <ArrowRight size={16} />
            </Link>
          </div>

          <ProductCardSlider products={officeBags} autoSlide={true} intervalMs={3800} />
        </section>
      </ScrollReveal>

      {/* 6. EXPEDITION FULL-WIDTH CAMPAIGN BANNER BREAK */}
      <ScrollReveal animation="scale-up">
        <section className="campaign-spotlight-banner container">
          <div className="campaign-banner-inner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1800&auto=format&fit=crop')` }}>
            <div className="campaign-banner-overlay" />
            <div className="campaign-banner-content">
              <span className="campaign-tag">NOMADIC EXPEDITION SERIES</span>
              <h2 className="campaign-title">Aviation-Grade Polycarbonate &amp; Weatherproof Duffles</h2>
              <p className="campaign-desc">Tested from -20°C glacial passes to desert heat. Zero failures. Guaranteed for a lifetime of wanderlust.</p>
              <div className="campaign-btn-row">
                <Link to="/category/travel-bags" className="btn btn-primary btn-lg">
                  Explore Luggage &amp; Travel <ArrowRight size={18} />
                </Link>
                <Link to="/category/duffle-bags" className="btn btn-secondary btn-lg campaign-btn-ghost">
                  Shop Weekend Duffles
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 7. TRAVEL & EXPEDITION CARD SLIDER ("PACK MORE. WORRY LESS.") */}
      <ScrollReveal animation="slide-up">
        <section className="section-travel-spotlight">
          <div className="container">
            <div className="spotlight-header-row">
              <div>
                <span className="section-eyebrow highlight">NOMADIC RANGE</span>
                <h2 className="heading-1">Pack More. Worry Less.</h2>
                <p className="section-lead">Virtually indestructible aerospace Makrolon® polycarbonate and ventilated shoe duffles.</p>
              </div>
              <Link to="/category/travel-bags" className="btn btn-outline">
                Shop Travel Bags ({travelBags.length}) <ArrowRight size={16} />
              </Link>
            </div>

            <ProductCardSlider products={travelBags} autoSlide={true} intervalMs={3700} />
          </div>
        </section>
      </ScrollReveal>

      {/* 8. ARCHITECTURAL HANDBAGS & SLINGS CARD SLIDER */}
      <ScrollReveal animation="heavy-lift">
        <section className="section-handbags container">
          <div className="spotlight-header-row">
            <div>
              <span className="section-eyebrow">CONTEMPORARY SILHOUETTES</span>
              <h2 className="heading-1">Architectural Handbags &amp; Slings</h2>
              <p className="section-lead">Supple scratch-proof vegan leather with magnetic closures and modular tech pouches.</p>
            </div>
            <Link to="/category/handbags" className="btn btn-outline">
              Shop Handbags &amp; Slings ({handbagBags.length}) <ArrowRight size={16} />
            </Link>
          </div>

          <ProductCardSlider products={handbagBags} autoSlide={true} intervalMs={3900} />
        </section>
      </ScrollReveal>

      {/* 9. BEST SELLERS ("MOST LOVED") */}
      <ScrollReveal animation="slide-up" staggerChildren={true}>
        <section className="section-bestsellers container">
          <div className="section-head text-center">
            <span className="section-eyebrow">VERIFIED CUSTOMER ACCLAIM</span>
            <h2 className="heading-1">Most Loved Essentials</h2>
            <p className="section-lead">The highest rated everyday carry gears across 100,000+ satisfied students and executives.</p>
          </div>

          <div className="products-grid-4">
            {bestSellers.map((product) => (
              <div key={product.id} className="stagger-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

