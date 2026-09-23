import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, Check, RotateCcw, ArrowDown, Loader2 } from 'lucide-react';
import { useProductStore, FilterState } from '../../store/useProductStore';
import { ProductCard } from '../../components/product/ProductCard';
import { ProductCardSkeleton } from '../../components/product/ProductCardSkeleton';
import { BagCapacity, LaptopSize, BagMaterial, BagCategory } from '../../types';
import './ProductListingPage.scss';

// Animated card item wrapper that reveals on scroll with staggered delay
const AnimatedCardItem: React.FC<{
  children: React.ReactNode;
  index: number;
}> = ({ children, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stagger delay within each 4-item batch (0ms, 90ms, 180ms, 270ms)
  const delay = (index % 4) * 90;

  return (
    <div
      ref={ref}
      className={`animated-card-item ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const ProductListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const { slug } = useParams<{ slug?: string }>();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination / Load More state (strictly 8 cards initially, +8 each load)
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    filters,
    setFilter,
    setSearchQuery,
    toggleCategoryFilter,
    toggleCapacityFilter,
    toggleLaptopFilter,
    toggleMaterialFilter,
    resetFilters,
    getFilteredProducts
  } = useProductStore();

  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
    } else if (slug) {
      setFilter('categories', [slug as BagCategory]);
    }
  }, [queryParam, slug]);

  // Trigger skeleton loading briefly when filters, category, or search query change
  useEffect(() => {
    setIsLoading(true);
    setVisibleCount(8);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [
    slug,
    queryParam,
    filters.categories,
    filters.capacity,
    filters.laptopSize,
    filters.material,
    filters.waterResistantOnly,
    filters.sortBy
  ]);

  const filteredProducts = getFilteredProducts();
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 8);
      setIsLoadingMore(false);
    }, 400);
  };

  // Filter option arrays
  const categoriesList: { label: string; value: BagCategory }[] = [
    { label: 'School Bags', value: 'school-bags' },
    { label: 'Laptop Tech Packs', value: 'laptop-bags' },
    { label: 'Office Briefcases', value: 'office-bags' },
    { label: 'Backpacks & Daypacks', value: 'backpacks' },
    { label: 'Sculpted Handbags', value: 'handbags' },
    { label: 'Modular Crossbody Slings', value: 'sling-bags' },
    { label: 'Weekender Duffles', value: 'duffle-bags' },
    { label: 'Polycarbonate Spinners', value: 'trolley-bags' },
    { label: 'Travel Accessories', value: 'accessories' }
  ];

  const capacities: BagCapacity[] = ['Under 10L', '10-20L', '20-30L', '30-40L', '40L+'];
  const laptopSizes: LaptopSize[] = ['None', '11"', '13"', '14"', '15.6"', '16"', '17"'];
  const materials: BagMaterial[] = [
    'Cordura Polyester',
    'Ballistic Nylon',
    'Full-Grain Leather',
    'Vegan PU',
    'Recycled Eco-Fabric'
  ];

  const activeFilterCount =
    filters.categories.length +
    filters.capacity.length +
    filters.laptopSize.length +
    filters.material.length +
    (filters.waterResistantOnly ? 1 : 0);

  return (
    <div className="plp-page container">
      {/* Breadcrumb & Header */}
      <div className="plp-header">
        <nav className="plp-breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Catalog</span>
          {slug && (
            <>
              <span>/</span>
              <span className="current-crumb">{slug.replace(/-/g, ' ').toUpperCase()}</span>
            </>
          )}
          {queryParam && (
            <>
              <span>/</span>
              <span className="current-crumb">SEARCH: "{queryParam}"</span>
            </>
          )}
        </nav>

        <div className="plp-title-row">
          <div>
            <h1 className="heading-1 plp-title">
              {queryParam
                ? `SEARCH RESULTS FOR "${queryParam.toUpperCase()}"`
                : slug
                ? slug.replace(/-/g, ' ').toUpperCase()
                : 'ALL CARRY COLLECTIONS'}
            </h1>
            <p className="plp-count">
              Showing <strong>{visibleProducts.length}</strong> of{' '}
              <strong>{filteredProducts.length}</strong> precision engineered models
            </p>
          </div>

          {/* Sort Control */}
          <div className="plp-controls-bar">
            <button
              className="btn btn-outline mobile-filter-trigger"
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={16} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <div className="sort-dropdown-wrap">
              <label htmlFor="sort-select">Sort By:</label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => setFilter('sortBy', e.target.value as FilterState['sortBy'])}
                className="sort-select"
              >
                <option value="featured">Recommended</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Product Grid */}
      <div className="plp-layout">
        {/* Desktop Sidebar Filters */}
        <aside className={`plp-filters-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-head">
            <div className="sidebar-title-group">
              <Filter size={18} />
              <h3>Refine Results</h3>
            </div>
            {activeFilterCount > 0 && (
              <button onClick={resetFilters} className="clear-filters-btn">
                <RotateCcw size={13} /> Reset ({activeFilterCount})
              </button>
            )}
            <button
              className="mobile-close-sidebar"
              onClick={() => setMobileFilterOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="filter-groups-list">
            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="group-heading">Category</h4>
              <div className="filter-options-vertical">
                {categoriesList.map((cat) => (
                  <label key={cat.value} className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat.value)}
                      onChange={() => toggleCategoryFilter(cat.value)}
                    />
                    <span className="checkbox-custom" />
                    <span className="option-label">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bag Specific: Capacity (Volume) */}
            <div className="filter-group">
              <h4 className="group-heading">Volume &amp; Capacity</h4>
              <div className="filter-options-chips">
                {capacities.map((cap) => (
                  <button
                    key={cap}
                    className={`filter-chip ${filters.capacity.includes(cap) ? 'active' : ''}`}
                    onClick={() => toggleCapacityFilter(cap)}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            {/* Bag Specific: Laptop Compatibility */}
            <div className="filter-group">
              <h4 className="group-heading">Laptop Partition Size</h4>
              <div className="filter-options-chips">
                {laptopSizes.map((size) => (
                  <button
                    key={size}
                    className={`filter-chip ${filters.laptopSize.includes(size) ? 'active' : ''}`}
                    onClick={() => toggleLaptopFilter(size)}
                  >
                    {size === 'None' ? 'No Laptop Sleeve' : size}
                  </button>
                ))}
              </div>
            </div>

            {/* Bag Specific: Material Selection */}
            <div className="filter-group">
              <h4 className="group-heading">Textile &amp; Leather</h4>
              <div className="filter-options-vertical">
                {materials.map((mat) => (
                  <label key={mat} className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={filters.material.includes(mat)}
                      onChange={() => toggleMaterialFilter(mat)}
                    />
                    <span className="checkbox-custom" />
                    <span className="option-label">{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Weather & Tech Toggle */}
            <div className="filter-group">
              <h4 className="group-heading">Protection &amp; Tech</h4>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={filters.waterResistantOnly}
                  onChange={(e) => setFilter('waterResistantOnly', e.target.checked)}
                />
                <span className="checkbox-custom" />
                <span className="option-label">Water Resistant / Waterproof Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="plp-grid-container">
          {isLoading ? (
            // Skeleton Loading: Exactly 8 shimmering skeleton cards
            <div className="plp-product-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-results-box">
              <h3>No matching models found</h3>
              <p>We could not find bags matching all selected criteria. Try loosening your filters.</p>
              <button onClick={resetFilters} className="btn btn-primary btn-sm">
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Product Grid with One-by-One Scroll Reveal Animation */}
              <div className="plp-product-grid">
                {visibleProducts.map((p, idx) => (
                  <AnimatedCardItem key={p.id} index={idx}>
                    <ProductCard product={p} />
                  </AnimatedCardItem>
                ))}

                {/* Skeletons for next batch while loading more */}
                {isLoadingMore &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <ProductCardSkeleton key={`skeleton-more-${i}`} />
                  ))}
              </div>

              {/* Load More Products Section */}
              <div className="plp-load-more-section">
                {/* Progress Bar & Counter */}
                <div className="load-more-progress">
                  <div className="progress-labels">
                    <span>
                      Viewing <strong>{visibleProducts.length}</strong> of{' '}
                      <strong>{filteredProducts.length}</strong> Products
                    </span>
                    <span className="percentage">
                      {Math.round((visibleProducts.length / filteredProducts.length) * 100)}%
                    </span>
                  </div>
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${Math.min(
                          100,
                          (visibleProducts.length / filteredProducts.length) * 100
                        )}%`
                      }}
                    />
                  </div>
                </div>

                {hasMore ? (
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="load-more-btn"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 size={16} className="btn-spinner" />
                        <span>Loading Next 8 Models...</span>
                      </>
                    ) : (
                      <>
                        <span>Load More Products</span>
                        <ArrowDown size={16} />
                      </>
                    )}
                  </button>
                ) : (
                  filteredProducts.length > 8 && (
                    <div className="all-loaded-message">
                      <div className="check-icon-circle">
                        <Check size={14} />
                      </div>
                      <span>You have viewed all {filteredProducts.length} products in this collection</span>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
