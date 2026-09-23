import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Layers, 
  SlidersHorizontal,
  Flame,
  Clock,
  Tag,
  Star,
  Award,
  Globe,
  CheckCircle2,
  Percent,
  Eye,
  ShoppingBag,
  Heart,
  X
} from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useAdminStore } from '../../store/useAdminStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { useToastStore } from '../../store/useToastStore';
import { ProductCard } from '../../components/product/ProductCard';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { INITIAL_PRODUCTS } from '../../data/mockData';
import { Product, ProductVariant } from '../../types';
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

// Reusable Trending Creations Card matching screenshot design exactly
interface TrendingCardProps {
  product: Product;
  rank: number;
  onQuickView: (p: Product) => void;
}

const TrendingCreationCard: React.FC<TrendingCardProps> = ({ product, rank, onQuickView }) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const activeVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const addItemToCart = useCartStore((s) => s.addItem);
  const setMiniCartOpen = useCartStore((s) => s.setMiniCartOpen);
  const addToast = useToastStore((s) => s.addToast);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    addToast({
      type: added ? 'success' : 'info',
      title: added ? 'Added to Wishlist' : 'Removed from Wishlist',
      description: product.name
    });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItemToCart({
      id: `${product.id}-${activeVariant.id}`,
      productId: product.id,
      productSlug: product.slug,
      name: product.name,
      brand: product.brand,
      category: product.category,
      variantId: activeVariant.id,
      colorName: activeVariant.colorName,
      colorHex: activeVariant.colorHex,
      image: activeVariant.images[0],
      price: activeVariant.price,
      originalPrice: activeVariant.originalPrice,
      maxStock: activeVariant.stock,
      capacity: activeVariant.capacity
    }, 1);
    setMiniCartOpen(true);
    addToast({
      type: 'success',
      title: 'Added to Bag',
      description: `${product.name} (${activeVariant.colorName})`
    });
  };

  const discountPercent = activeVariant.originalPrice > activeVariant.price
    ? Math.round(((activeVariant.originalPrice - activeVariant.price) / activeVariant.originalPrice) * 100)
    : 0;

  return (
    <div className="trending-creation-card">
      <div className="trending-media-box">
        {/* Top Badges */}
        <div className="trending-top-badges">
          <div className="rank-square-badge">{rank}</div>
          <div className="status-badges-stack">
            {rank === 1 && (
              <>
                <span className="pill-badge badge-bestseller">BESTSELLER</span>
                <span className="pill-badge badge-exclusive">EXCLUSIVE</span>
              </>
            )}
            {rank === 2 && (
              <>
                <span className="pill-badge badge-new">NEW</span>
                <span className="pill-badge badge-bestseller">BESTSELLER</span>
              </>
            )}
            {rank === 3 && (
              <span className="pill-badge badge-exclusive">EXCLUSIVE</span>
            )}
            {rank === 4 && (
              <span className="pill-badge badge-bestseller">BESTSELLER</span>
            )}
            {rank > 4 && (
              <span className="pill-badge badge-trending">TRENDING</span>
            )}
          </div>
        </div>

        {/* Top Right Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          className={`trending-wishlist-btn ${isInWishlist ? 'active' : ''}`}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={isInWishlist ? '#dc2626' : 'none'} color={isInWishlist ? '#dc2626' : '#1f2937'} />
        </button>

        {/* Product Image */}
        <Link to={`/product/${product.slug}`} className="trending-img-link">
          <img
            src={activeVariant.images[0]}
            alt={product.name}
            className="trending-card-img"
            loading="lazy"
          />
        </Link>

        {/* Hover Action Overlay */}
        <div className="trending-hover-actions">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="btn-quick-action quick-view-btn"
          >
            <Eye size={15} /> Quick View
          </button>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="btn-quick-action quick-add-btn"
          >
            <ShoppingBag size={15} /> Quick Add
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="trending-card-details">
        <div className="trending-meta-row">
          <span className="trending-brand">{product.brand || 'VELO ATELIER'}</span>
          <span className="trending-rating">
            <Star size={13} fill="#f59e0b" color="#f59e0b" /> {product.rating || 4.9}
          </span>
        </div>

        <Link to={`/product/${product.slug}`} className="trending-title-link">
          {product.name}
        </Link>

        {/* Swatches Row */}
        <div className="trending-swatches-row">
          {product.variants.slice(0, 3).map((v, vIdx) => (
            <button
              key={v.id}
              type="button"
              className={`swatch-circle ${vIdx === selectedVariantIdx ? 'selected' : ''}`}
              style={{ backgroundColor: v.colorHex }}
              onClick={() => setSelectedVariantIdx(vIdx)}
              title={v.colorName}
              aria-label={v.colorName}
            />
          ))}
          {product.variants.length > 2 && (
            <span className="swatch-count-more">+{product.variants.length - 2}</span>
          )}
        </div>

        {/* Price Row */}
        <div className="trending-price-row">
          <span className="price-current">₹{activeVariant.price.toLocaleString('en-IN')}</span>
          {activeVariant.originalPrice > activeVariant.price && (
            <span className="price-original">₹{activeVariant.originalPrice.toLocaleString('en-IN')}</span>
          )}
          {discountPercent > 0 && (
            <span className="price-discount-tag">{discountPercent}% OFF</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trendingTab, setTrendingTab] = useState<'ALL' | 'MEN' | 'WOMEN' | 'ACCESSORIES'>('ALL');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewVariantIdx, setQuickViewVariantIdx] = useState(0);

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

  const getTrendingProducts = (): Product[] => {
    switch (trendingTab) {
      case 'MEN': {
        const list = catalog.filter((p) => p.category === 'office-bags' || p.category === 'laptop-bags' || p.category === 'backpacks');
        return list.length >= 4 ? list.slice(0, 4) : catalog.slice(0, 4);
      }
      case 'WOMEN': {
        const list = catalog.filter((p) => p.category === 'handbags' || p.category === 'sling-bags');
        return list.length >= 4 ? list.slice(0, 4) : catalog.slice(0, 4);
      }
      case 'ACCESSORIES': {
        const list = catalog.filter((p) => p.category === 'travel-bags' || p.category === 'duffle-bags' || p.category === 'exported' || p.category === 'generic');
        return list.length >= 4 ? list.slice(0, 4) : catalog.slice(0, 4);
      }
      case 'ALL':
      default:
        return bestSellers.length >= 4 ? bestSellers : catalog.slice(0, 4);
    }
  };

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

  // --- 1. FLASH SALE SLIDER DATA & STATE ---
  const flashSaleSlides = [
    {
      id: 'fs-1',
      title: 'End-of-Season Executive Clearance',
      eyebrow: 'FLASH SALE • 48H ONLY',
      subtitle: 'Up to 50% off TSA clamshell laptop packs and Italian Tuscan pull-up leather briefcases.',
      discount: 'UP TO 50% OFF',
      code: 'EXEC50',
      link: '/category/laptop-bags',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1400&auto=format&fit=crop',
      tag: 'HOT DEAL',
      badgeColor: '#b91c1c'
    },
    {
      id: 'fs-2',
      title: 'Back-to-Campus Rush Drop',
      eyebrow: 'ACADEMIC EXCELLENCE',
      subtitle: 'Ergonomic spine-safe school backpacks with reflective night bands & insulated compartments.',
      discount: 'FLAT 40% OFF',
      code: 'CAMPUS40',
      link: '/category/school-bags',
      image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1400&auto=format&fit=crop',
      tag: 'BESTSELLER DEAL',
      badgeColor: '#9a6233'
    },
    {
      id: 'fs-3',
      title: 'Nomadic Traveler\'s Privilege',
      eyebrow: 'GLOBAL WANDERLUST',
      subtitle: 'Aviation-grade Makrolon® 360° spinner trolleys & weatherproof duffles for global voyages.',
      discount: 'UP TO 45% OFF',
      code: 'VOYAGER45',
      link: '/category/travel-bags',
      image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1400&auto=format&fit=crop',
      tag: 'LIMITED DROP',
      badgeColor: '#1d4ed8'
    },
    {
      id: 'fs-4',
      title: 'Export Surplus Direct Liquidation',
      eyebrow: 'FACTORY DIRECT CLEARANCE',
      subtitle: 'Heavy-duty Mil-Spec export overruns and generic raw utility carry gear at zero distributor markup.',
      discount: 'STARTING ₹999',
      code: 'EXPORTCLEAR',
      link: '/category/exported',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1400&auto=format&fit=crop',
      tag: 'DIRECT FACTORY',
      badgeColor: '#059669'
    }
  ];

  const [currentFlashSlide, setCurrentFlashSlide] = useState(0);
  const [isFlashHovered, setIsFlashHovered] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 14, minutes: 42, seconds: 18 });

  // Flash Sale Autoplay Timer
  useEffect(() => {
    if (isFlashHovered) return;
    const timer = setInterval(() => {
      setCurrentFlashSlide((prev) => (prev + 1) % flashSaleSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isFlashHovered, flashSaleSlides.length]);

  // Live Flash Countdown Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- 2. SPOTLIGHT BEST PRODUCTS SLIDER DATA & STATE ---
  const spotlightSlides = [
    {
      id: 'sp-1',
      name: 'Velo Apex Pro 32L Commuter',
      tagline: 'FLAGSHIP URBAN SYSTEM',
      price: '₹4,899',
      oldPrice: '₹6,999',
      rating: '4.9',
      reviewCount: '1,240',
      features: ['16-inch TSA Clamshell', 'Ballistic 1680D Nylon', 'IPX5 Weatherproof'],
      desc: 'The pinnacle of urban engineering. Designed for developers, founders, and commuters requiring maximum payload protection.',
      link: '/category/backpacks',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
      badge: 'TOP RATED'
    },
    {
      id: 'sp-2',
      name: 'Velo Heritage Tuscan Briefcase',
      tagline: 'MASTER ATELIER LEATHER',
      price: '₹8,499',
      oldPrice: '₹11,999',
      rating: '5.0',
      reviewCount: '480',
      features: ['Tuscan Full-Grain Leather', 'Solid Brass Hardware', 'Dedicated Tablet Chamber'],
      desc: 'Handcrafted in artisan batches. Develops a rich organic patina through years of transatlantic travel and executive summits.',
      link: '/category/office-bags',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
      badge: 'HERITAGE CRAFT'
    },
    {
      id: 'sp-3',
      name: 'Velo Transcontinental 55L Spinner',
      tagline: 'AEROSPACE MAKROLON®',
      price: '₹7,299',
      oldPrice: '₹9,999',
      rating: '4.9',
      reviewCount: '890',
      features: ['Makrolon® Polycarbonate', 'Hinomoto Silent Casters', 'TSA Integrated Lock'],
      desc: 'Impact-tested from sub-zero Alpine passes to tropical humidity. Ultra-light, unbreakable exterior with whisper-quiet glide.',
      link: '/category/travel-bags',
      image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop',
      badge: 'INDESTRUCTIBLE'
    },
    {
      id: 'sp-4',
      name: 'Velo Stealth Tactical Sling Pack',
      tagline: 'URBAN QUICK-DEPLOY',
      price: '₹2,699',
      oldPrice: '₹3,999',
      rating: '4.8',
      reviewCount: '620',
      features: ['Fidlock® Magnetic Buckle', 'Concealed Passport Pocket', 'Quick-Access Key Leash'],
      desc: 'Ultra-compact chest sling built for everyday cross-city transits, airport security dashes, and fast-paced utility.',
      link: '/category/backpacks',
      image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop',
      badge: 'RAPID TRANSIT'
    }
  ];

  const [currentSpotlightSlide, setCurrentSpotlightSlide] = useState(0);
  const [isSpotlightHovered, setIsSpotlightHovered] = useState(false);

  // Spotlight Autoplay Timer
  useEffect(() => {
    if (isSpotlightHovered) return;
    const timer = setInterval(() => {
      setCurrentSpotlightSlide((prev) => (prev + 1) % spotlightSlides.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [isSpotlightHovered, spotlightSlides.length]);

  // --- 3. EDITORIAL LOOKBOOK HORIZON SLIDER DATA & STATE ---
  const lookbookSlides = [
    {
      id: 'lb-1',
      season: 'AUTUMN / WINTER 2026',
      title: 'The Obsidian Commuter',
      subtitle: 'Sharp geometric silhouettes and matte textures tailored for contemporary architecture and minimalist urban living.',
      link: '/category/backpacks',
      image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1600&auto=format&fit=crop',
      lookCount: '12 Curated Silhouettes',
      theme: 'METROPOLITAN MONOCHROME'
    },
    {
      id: 'lb-2',
      season: 'METROPOLITAN RUNWAY',
      title: 'Sculptural Totes & Micro Slings',
      subtitle: 'Effortless transitional bags that elevate smoothly from daytime boardroom presentations to evening soirees.',
      link: '/category/handbags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1600&auto=format&fit=crop',
      lookCount: '8 Signature Models',
      theme: 'ATELIER COUTURE'
    },
    {
      id: 'lb-3',
      season: 'EXPEDITION GRADE',
      title: 'Transatlantic Nomadic Series',
      subtitle: 'Unrestricted travel gear engineered to withstand the harshest global airport terminals and rugged outdoor terrains.',
      link: '/category/travel-bags',
      image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1600&auto=format&fit=crop',
      lookCount: '10 Travel Systems',
      theme: 'ALPINE & DESERT'
    },
    {
      id: 'lb-4',
      season: 'RAW MINIMALISM',
      title: 'The Unbranded Utility Collection',
      subtitle: 'Pure ergonomics and reinforced bar-tack stitching. Zero logo distraction, 100% industrial performance.',
      link: '/category/generic',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1600&auto=format&fit=crop',
      lookCount: '6 Raw Prototypes',
      theme: 'ZERO MARKUP RAW'
    }
  ];

  const [currentLookbookSlide, setCurrentLookbookSlide] = useState(0);
  const [isLookbookHovered, setIsLookbookHovered] = useState(false);

  // Lookbook Autoplay Timer
  useEffect(() => {
    if (isLookbookHovered) return;
    const timer = setInterval(() => {
      setCurrentLookbookSlide((prev) => (prev + 1) % lookbookSlides.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [isLookbookHovered, lookbookSlides.length]);

  // --- 4. EXPORT & GENERIC ESSENTIALS SLIDER DATA & STATE ---
  const exportGenericSlides = [
    {
      id: 'eg-1',
      category: 'EXPORT SURPLUS DIVISION',
      title: 'Mil-Spec 1000D Tactical Pack',
      badge: 'GLOBAL STANDARD EXPORT',
      specs: 'Tested to 40kg tensile load • Reinforced bar-tack stitching • Water-repellent Teflon coating',
      priceTag: 'Export Batch ₹2,999',
      originalPrice: '₹5,499',
      link: '/category/exported',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1400&auto=format&fit=crop',
      highlight: 'Military-Grade Durability'
    },
    {
      id: 'eg-2',
      category: 'GENERIC ESSENTIALS',
      title: 'Unbranded Daily Campus Carry',
      badge: 'ZERO MARKUP DIRECT',
      specs: 'High-density nylon weave • Dual bottle holsters • Spine-contour airflow padding',
      priceTag: 'Direct Factory ₹1,299',
      originalPrice: '₹2,499',
      link: '/category/generic',
      image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1400&auto=format&fit=crop',
      highlight: 'Pure Ergonomic Utility'
    },
    {
      id: 'eg-3',
      category: 'EXPORT SURPLUS DIVISION',
      title: 'Heavy-Duty Transcontinental Duffle',
      badge: 'AIRLINE APPROVED 45L',
      specs: 'Ballistic tear-stop exterior • Lockable waterproof zips • Stowaway ergonomic shoulder harness',
      priceTag: 'Export Batch ₹3,499',
      originalPrice: '₹6,999',
      link: '/category/exported',
      image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1400&auto=format&fit=crop',
      highlight: 'Global Airline Carry-On'
    },
    {
      id: 'eg-4',
      category: 'GENERIC ESSENTIALS',
      title: 'All-Weather Roll-Top Laptop Dry-Bag',
      badge: 'IPX6 SEALED SEAMS',
      specs: 'Seamless high-frequency welding • Removable padded laptop core • Reflective anchor loops',
      priceTag: 'Direct Factory ₹1,799',
      originalPrice: '₹3,299',
      link: '/category/generic',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1400&auto=format&fit=crop',
      highlight: 'Submersible Waterproof Shell'
    }
  ];

  const [currentExportSlide, setCurrentExportSlide] = useState(0);
  const [isExportHovered, setIsExportHovered] = useState(false);

  // Export Surplus Autoplay Timer
  useEffect(() => {
    if (isExportHovered) return;
    const timer = setInterval(() => {
      setCurrentExportSlide((prev) => (prev + 1) % exportGenericSlides.length);
    }, 4600);
    return () => clearInterval(timer);
  }, [isExportHovered, exportGenericSlides.length]);

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

      {/* 3. CURATED SIGNATURES - TRENDING CREATIONS (3RD SECTION) */}
      <ScrollReveal animation="slide-up">
        <section className="section-trending-creations container">
          <div className="trending-creations-head">
            <div className="trending-title-block">
              <span className="trending-eyebrow">CURATED SIGNATURES</span>
              <h2 className="trending-heading">TRENDING CREATIONS</h2>
            </div>

            <div className="trending-filter-tabs">
              {(['ALL', 'MEN', 'WOMEN', 'ACCESSORIES'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`tab-pill ${trendingTab === tab ? 'active' : ''}`}
                  onClick={() => setTrendingTab(tab)}
                >
                  {tab === 'ALL' ? 'ALL CREATIONS' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="trending-creations-grid">
            {getTrendingProducts().map((product, idx) => (
              <TrendingCreationCard
                key={product.id}
                product={product}
                rank={idx + 1}
                onQuickView={(p) => {
                  setQuickViewProduct(p);
                  setQuickViewVariantIdx(0);
                }}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* NEW SLIDER 1: FLASH SALE & LIMITED DROPS AUTO ANIMATED BANNER SLIDER */}
      <ScrollReveal animation="heavy-lift">
        <section 
          className="section-flash-sale-slider container"
          onMouseEnter={() => setIsFlashHovered(true)}
          onMouseLeave={() => setIsFlashHovered(false)}
        >
          <div className="flash-slider-card">
            {flashSaleSlides.map((slide, idx) => (
              <div 
                key={slide.id} 
                className={`flash-slide ${idx === currentFlashSlide ? 'active' : ''}`}
              >
                <div className="flash-slide-content">
                  <div className="flash-meta-header">
                    <span className="flash-live-badge" style={{ backgroundColor: slide.badgeColor }}>
                      <Flame size={14} className="badge-icon-flame" /> {slide.eyebrow}
                    </span>
                    <div className="flash-countdown-ticker">
                      <Clock size={14} />
                      <span className="ticker-label">ENDS IN:</span>
                      <span className="ticker-digits">
                        {String(countdown.hours).padStart(2, '0')}h : {String(countdown.minutes).padStart(2, '0')}m : {String(countdown.seconds).padStart(2, '0')}s
                      </span>
                    </div>
                  </div>

                  <h3 className="flash-slide-title">{slide.title}</h3>
                  <p className="flash-slide-subtitle">{slide.subtitle}</p>

                  <div className="flash-perks-row">
                    <div className="flash-discount-badge">
                      <Percent size={14} /> {slide.discount}
                    </div>
                    <div className="flash-coupon-chip">
                      <Tag size={13} />
                      <span className="code-label">USE CODE:</span>
                      <span className="code-val">{slide.code}</span>
                    </div>
                  </div>

                  <div className="flash-cta-group">
                    <Link to={slide.link} className="btn btn-primary flash-claim-btn">
                      CLAIM FLASH DEAL <ArrowRight size={16} />
                    </Link>
                    <span className="flash-stock-warning">
                      <span className="pulse-dot" /> Limited production batch. Ships within 24h.
                    </span>
                  </div>
                </div>

                <div className="flash-slide-media">
                  <img src={slide.image} alt={slide.title} className="flash-img" loading="lazy" />
                  <div className="flash-img-gradient" />
                  <span className="flash-floating-tag">{slide.tag}</span>
                </div>
              </div>
            ))}

            {/* Flash Slider Bottom Navigation Bar */}
            <div className="flash-slider-nav">
              <div className="flash-dots-list">
                {flashSaleSlides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`flash-dot ${idx === currentFlashSlide ? 'active' : ''}`}
                    onClick={() => setCurrentFlashSlide(idx)}
                    aria-label={`Jump to offer ${idx + 1}`}
                  >
                    <span className="dot-fill" />
                  </button>
                ))}
              </div>

              <div className="flash-nav-arrows">
                <button
                  type="button"
                  onClick={() => setCurrentFlashSlide((prev) => (prev - 1 + flashSaleSlides.length) % flashSaleSlides.length)}
                  className="flash-arrow-btn prev"
                  aria-label="Previous offer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentFlashSlide((prev) => (prev + 1) % flashSaleSlides.length)}
                  className="flash-arrow-btn next"
                  aria-label="Next offer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
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

      {/* NEW SLIDER 2: CURATED SPOTLIGHT & BEST PRODUCTS SHOWCASE BANNER SLIDER */}
      <ScrollReveal animation="slide-up">
        <section 
          className="section-spotlight-slider container"
          onMouseEnter={() => setIsSpotlightHovered(true)}
          onMouseLeave={() => setIsSpotlightHovered(false)}
        >
          <div className="section-head text-center">
            <span className="section-eyebrow highlight">ENGINEERING BENCHMARK</span>
            <h2 className="heading-1">Atelier Spotlight &amp; Best Products</h2>
            <p className="section-lead">The pinnacle of technical carry systems evaluated by over 100,000+ daily commuters.</p>
          </div>

          <div className="spotlight-slider-card">
            {spotlightSlides.map((slide, idx) => (
              <div 
                key={slide.id} 
                className={`spotlight-slide ${idx === currentSpotlightSlide ? 'active' : ''}`}
              >
                <div className="spotlight-slide-info">
                  <div className="spotlight-top-badge-row">
                    <span className="spotlight-badge"><Award size={13} /> {slide.badge}</span>
                    <span className="spotlight-rating">
                      <Star size={13} fill="#f59e0b" color="#f59e0b" /> {slide.rating} ({slide.reviewCount} Reviews)
                    </span>
                  </div>

                  <span className="spotlight-tagline">{slide.tagline}</span>
                  <h3 className="spotlight-title">{slide.name}</h3>
                  <p className="spotlight-desc">{slide.desc}</p>

                  <div className="spotlight-specs-row">
                    {slide.features.map((feat, fIdx) => (
                      <span key={fIdx} className="spec-pill">
                        <CheckCircle2 size={13} /> {feat}
                      </span>
                    ))}
                  </div>

                  <div className="spotlight-price-row">
                    <div className="price-stack">
                      <span className="spotlight-current-price">{slide.price}</span>
                      <span className="spotlight-old-price">{slide.oldPrice}</span>
                    </div>
                    <Link to={slide.link} className="btn btn-primary spotlight-cta-btn">
                      EXPLORE SPECIFICATIONS <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="spotlight-slide-visual">
                  <div className="visual-backdrop-glow" />
                  <img src={slide.image} alt={slide.name} className="spotlight-img" loading="lazy" />
                  <div className="floating-craft-chip">
                    <ShieldCheck size={14} />
                    <span>LIFETIME ATELIER GUARANTEE</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Spotlight Slider Tabbed Navigation */}
            <div className="spotlight-bottom-tabs">
              <div className="spotlight-tabs-track">
                {spotlightSlides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`spotlight-tab-btn ${idx === currentSpotlightSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSpotlightSlide(idx)}
                  >
                    <span className="tab-number">0{idx + 1}</span>
                    <span className="tab-label">{s.name.split(' ')[1] || s.name}</span>
                    <span className="tab-progress-line" />
                  </button>
                ))}
              </div>

              <div className="spotlight-arrows-box">
                <button
                  type="button"
                  onClick={() => setCurrentSpotlightSlide((prev) => (prev - 1 + spotlightSlides.length) % spotlightSlides.length)}
                  className="spotlight-arrow-btn prev"
                  aria-label="Previous spotlight product"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentSpotlightSlide((prev) => (prev + 1) % spotlightSlides.length)}
                  className="spotlight-arrow-btn next"
                  aria-label="Next spotlight product"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
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

      {/* NEW SLIDER 3: SEASONAL LOOKBOOK & EDITORIAL HORIZON SLIDER */}
      <ScrollReveal animation="fade-zoom">
        <section 
          className="section-lookbook-slider container"
          onMouseEnter={() => setIsLookbookHovered(true)}
          onMouseLeave={() => setIsLookbookHovered(false)}
        >
          <div className="lookbook-slider-stage">
            {lookbookSlides.map((slide, idx) => (
              <div 
                key={slide.id} 
                className={`lookbook-slide ${idx === currentLookbookSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="lookbook-overlay" />
                <div className="lookbook-content-container">
                  <div className="lookbook-badge-row">
                    <span className="lookbook-season-badge">{slide.season}</span>
                    <span className="lookbook-count-badge">{slide.lookCount}</span>
                  </div>

                  <span className="lookbook-theme-kicker">{slide.theme}</span>
                  <h2 className="lookbook-headline">{slide.title}</h2>
                  <p className="lookbook-subtitle">{slide.subtitle}</p>

                  <div className="lookbook-btn-row">
                    <Link to={slide.link} className="btn btn-primary lookbook-cta-btn">
                      EXPLORE LOOKBOOK <ArrowRight size={16} />
                    </Link>
                    <Link to="/products" className="btn btn-secondary lookbook-btn-light">
                      VIEW FULL COLLECTION
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Lookbook Navigation Control Bar */}
            <div className="lookbook-nav-bar">
              <div className="lookbook-indicator-progress">
                <span className="current-idx">0{currentLookbookSlide + 1}</span>
                <div className="lookbook-progress-track">
                  <div 
                    className="lookbook-progress-fill" 
                    style={{ width: `${((currentLookbookSlide + 1) / lookbookSlides.length) * 100}%` }}
                  />
                </div>
                <span className="total-idx">0{lookbookSlides.length}</span>
              </div>

              <div className="lookbook-arrows-wrapper">
                <button
                  type="button"
                  onClick={() => setCurrentLookbookSlide((prev) => (prev - 1 + lookbookSlides.length) % lookbookSlides.length)}
                  className="lookbook-arrow-btn prev"
                  aria-label="Previous lookbook slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentLookbookSlide((prev) => (prev + 1) % lookbookSlides.length)}
                  className="lookbook-arrow-btn next"
                  aria-label="Next lookbook slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
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

      {/* NEW SLIDER 4: EXPORT SURPLUS & GENERIC ESSENTIALS SLIDER */}
      <ScrollReveal animation="heavy-lift">
        <section 
          className="section-export-generic-slider container"
          onMouseEnter={() => setIsExportHovered(true)}
          onMouseLeave={() => setIsExportHovered(false)}
        >
          <div className="section-head text-center">
            <span className="section-eyebrow highlight">GLOBAL TRANSIT &amp; RAW UTILITY</span>
            <h2 className="heading-1">Export Surplus &amp; Generic Batch Essentials</h2>
            <p className="section-lead">International military-grade overruns and clean, unbranded raw utility carry bags direct from manufacturing.</p>
          </div>

          <div className="export-generic-slider-card">
            {exportGenericSlides.map((slide, idx) => (
              <div 
                key={slide.id} 
                className={`eg-slide ${idx === currentExportSlide ? 'active' : ''}`}
              >
                <div className="eg-content-col">
                  <div className="eg-header-pills">
                    <span className="eg-cat-pill"><Globe size={13} /> {slide.category}</span>
                    <span className="eg-badge-pill">{slide.badge}</span>
                  </div>

                  <h3 className="eg-title">{slide.title}</h3>
                  <div className="eg-highlight-tag">
                    <ShieldCheck size={14} /> {slide.highlight}
                  </div>

                  <p className="eg-specs-text">{slide.specs}</p>

                  <div className="eg-pricing-row">
                    <div className="eg-price-box">
                      <span className="eg-price-label">FACTORY PRICE</span>
                      <div className="eg-price-nums">
                        <span className="eg-current-price">{slide.priceTag}</span>
                        <span className="eg-orig-price">{slide.originalPrice}</span>
                      </div>
                    </div>
                    <Link to={slide.link} className="btn btn-primary eg-cta-btn">
                      SHOP THIS BATCH <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="eg-media-col">
                  <img src={slide.image} alt={slide.title} className="eg-img" loading="lazy" />
                  <div className="eg-media-overlay" />
                  <div className="eg-stamp-badge">
                    <span className="stamp-text">AUTHENTIC BATCH</span>
                    <span className="stamp-sub">ZERO MARKUP</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Export & Generic Slider Nav Bar */}
            <div className="eg-slider-nav-row">
              <div className="eg-nav-dots">
                {exportGenericSlides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`eg-dot-btn ${idx === currentExportSlide ? 'active' : ''}`}
                    onClick={() => setCurrentExportSlide(idx)}
                    aria-label={`Jump to batch ${idx + 1}`}
                  >
                    <span className="dot-index">0{idx + 1}</span>
                    <span className="dot-title">{s.title.split(' ')[0]}</span>
                    <span className="dot-bar" />
                  </button>
                ))}
              </div>

              <div className="eg-nav-arrows">
                <button
                  type="button"
                  onClick={() => setCurrentExportSlide((prev) => (prev - 1 + exportGenericSlides.length) % exportGenericSlides.length)}
                  className="eg-arrow-btn prev"
                  aria-label="Previous batch"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentExportSlide((prev) => (prev + 1) % exportGenericSlides.length)}
                  className="eg-arrow-btn next"
                  aria-label="Next batch"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
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

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="quickview-modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="quickview-close-btn"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="quickview-grid">
              <div className="quickview-media">
                <img
                  src={quickViewProduct.variants[quickViewVariantIdx]?.images[0] || quickViewProduct.variants[0]?.images[0]}
                  alt={quickViewProduct.name}
                  className="quickview-img"
                />
              </div>

              <div className="quickview-body">
                <span className="quickview-brand">{quickViewProduct.brand || 'VELO ATELIER'}</span>
                <h3 className="quickview-title">{quickViewProduct.name}</h3>

                <div className="quickview-rating">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>{quickViewProduct.rating || 4.9}</span>
                  <span className="reviews-cnt">({quickViewProduct.reviewCount || 120} reviews)</span>
                </div>

                <div className="quickview-price-row">
                  <span className="qv-price">₹{quickViewProduct.variants[quickViewVariantIdx]?.price.toLocaleString('en-IN')}</span>
                  {quickViewProduct.variants[quickViewVariantIdx]?.originalPrice > quickViewProduct.variants[quickViewVariantIdx]?.price && (
                    <span className="qv-orig-price">₹{quickViewProduct.variants[quickViewVariantIdx]?.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>

                <p className="quickview-desc">{quickViewProduct.description}</p>

                {/* Variant Swatches */}
                <div className="quickview-swatches">
                  <span className="qv-swatch-label">Color: <strong>{quickViewProduct.variants[quickViewVariantIdx]?.colorName}</strong></span>
                  <div className="qv-swatch-list">
                    {quickViewProduct.variants.map((v, vIdx) => (
                      <button
                        key={v.id}
                        type="button"
                        className={`qv-swatch-btn ${vIdx === quickViewVariantIdx ? 'selected' : ''}`}
                        style={{ backgroundColor: v.colorHex }}
                        onClick={() => setQuickViewVariantIdx(vIdx)}
                        title={v.colorName}
                      />
                    ))}
                  </div>
                </div>

                <div className="quickview-actions">
                  <button
                    type="button"
                    className="btn btn-primary qv-add-btn"
                    onClick={() => {
                      const v = quickViewProduct.variants[quickViewVariantIdx] || quickViewProduct.variants[0];
                      useCartStore.getState().addItem({
                        id: `${quickViewProduct.id}-${v.id}`,
                        productId: quickViewProduct.id,
                        productSlug: quickViewProduct.slug,
                        name: quickViewProduct.name,
                        brand: quickViewProduct.brand,
                        category: quickViewProduct.category,
                        variantId: v.id,
                        colorName: v.colorName,
                        colorHex: v.colorHex,
                        image: v.images[0],
                        price: v.price,
                        originalPrice: v.originalPrice,
                        maxStock: v.stock,
                        capacity: v.capacity
                      }, 1);
                      useCartStore.getState().setMiniCartOpen(true);
                      useToastStore.getState().addToast({
                        type: 'success',
                        title: 'Added to Bag',
                        description: `${quickViewProduct.name} (${v.colorName})`
                      });
                      setQuickViewProduct(null);
                    }}
                  >
                    <ShoppingBag size={16} /> ADD TO SHOPPING BAG
                  </button>

                  <Link
                    to={`/product/${quickViewProduct.slug}`}
                    className="btn btn-outline qv-details-btn"
                    onClick={() => setQuickViewProduct(null)}
                  >
                    VIEW FULL DETAILS <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

