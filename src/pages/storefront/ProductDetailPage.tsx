import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Zap,
  MapPin,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Check,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useToastStore } from '../../store/useToastStore';
import { ProductCard } from '../../components/product/ProductCard';
import './ProductDetailPage.scss';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const products = useProductStore((s) => s.products);
  const addItemToCart = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  const product = products.find((p) => p.slug === slug) || products[0];

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [userReviewRating, setUserReviewRating] = useState(5);
  const [userReviewComment, setUserReviewComment] = useState('');

  // Hover Zoom State
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [zoomImgSrc, setZoomImgSrc] = useState('');
  const [lensStyle, setLensStyle] = useState({ top: 0, left: 0, width: 120, height: 120 });
  const [zoomBgPos, setZoomBgPos] = useState({ x: 50, y: 50 });

  const recommendationsTrackRef = useRef<HTMLDivElement>(null);

  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];

  // Curate 4 gallery images (front, side with dimensions, back, interior/detail)
  const baseImages = activeVariant.images.length > 0 ? activeVariant.images : [
    'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1200&auto=format&fit=crop'
  ];

  // Complementary high quality gallery angles if less than 4
  const defaultAngles = [
    'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
  ];

  const galleryImages = [
    baseImages[0],
    baseImages[1] || defaultAngles[0],
    baseImages[2] || defaultAngles[1],
    baseImages[3] || defaultAngles[2]
  ];

  // Zoom Mouse Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, imgSrc: string) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const lensW = 140;
    const lensH = 140;

    let lensLeft = mouseX - lensW / 2;
    let lensTop = mouseY - lensH / 2;

    // Constrain lens inside bounds
    if (lensLeft < 0) lensLeft = 0;
    if (lensTop < 0) lensTop = 0;
    if (lensLeft > rect.width - lensW) lensLeft = rect.width - lensW;
    if (lensTop > rect.height - lensH) lensTop = rect.height - lensH;

    // Calculate zoom background position percentage
    const xPercent = (lensLeft / (rect.width - lensW)) * 100;
    const yPercent = (lensTop / (rect.height - lensH)) * 100;

    setLensStyle({
      left: lensLeft,
      top: lensTop,
      width: lensW,
      height: lensH
    });
    setZoomBgPos({ x: xPercent, y: yPercent });
    setZoomImgSrc(imgSrc);
    setIsZoomActive(true);
  };

  const handleMouseLeave = () => {
    setIsZoomActive(false);
  };

  const handleAddToCart = () => {
    addItemToCart(
      {
        id: `${product.id}-${activeVariant.id}`,
        productId: product.id,
        productSlug: product.slug,
        name: product.name,
        brand: product.brand,
        category: product.category,
        variantId: activeVariant.id,
        colorName: activeVariant.colorName,
        colorHex: activeVariant.colorHex,
        image: activeVariant.images[0] || galleryImages[0],
        price: activeVariant.price,
        originalPrice: activeVariant.originalPrice,
        maxStock: activeVariant.stock,
        capacity: activeVariant.capacity
      },
      quantity
    );

    addToast({
      type: 'success',
      title: 'Added to Cart',
      description: `${quantity}x ${product.name} (${activeVariant.colorName})`
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setPincodeStatus(`Delivery available to ${pincode}! Expected within 2-3 Business Days. Cash on Delivery available.`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit postal pincode.');
    }
  };

  const scrollRecommendations = (dir: 'left' | 'right') => {
    if (!recommendationsTrackRef.current) return;
    const scrollAmount = 340;
    recommendationsTrackRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 8);

  const discountPercentage = Math.round(
    ((activeVariant.originalPrice - activeVariant.price) / activeVariant.originalPrice) * 100
  );

  return (
    <div className="pdp-wrapper">
      <div className="container pdp-content-container">
        {/* Breadcrumb Trail */}
        <nav className="pdp-breadcrumbs">
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <Link to={`/category/${product.category}`}>{product.category.replace(/-/g, ' ')}</Link>
          <ChevronRight size={13} />
          <span className="current-crumb">{product.name}</span>
        </nav>

        {/* Primary 2-Column Section */}
        <div className="pdp-hero-grid">
          {/* Left Column: 2-Column Image Gallery Grid */}
          <div className="pdp-gallery-column">
            <div className="gallery-2col-grid">
              {galleryImages.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className="gallery-grid-cell"
                  onMouseMove={(e) => handleMouseMove(e, imgSrc)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img src={imgSrc} alt={`${product.name} view ${idx + 1}`} className="grid-cell-img" />

                  {/* Dimension overlay on the first image (as seen in reference img) */}
                  {idx === 0 && (
                    <div className="dimensions-callout-overlay">
                      <div className="dim-height-indicator">
                        <span className="dim-text">{product.dimensions.heightCm || 42} cm</span>
                        <div className="dim-arrow-v" />
                      </div>
                      <div className="dim-width-indicator">
                        <span className="dim-text">{product.dimensions.widthCm || 14} cm</span>
                        <div className="dim-arrow-h" />
                      </div>
                    </div>
                  )}

                  {/* Active Hover Zoom Lens */}
                  {isZoomActive && zoomImgSrc === imgSrc && (
                    <div
                      className="zoom-cursor-lens"
                      style={{
                        top: `${lensStyle.top}px`,
                        left: `${lensStyle.left}px`,
                        width: `${lensStyle.width}px`,
                        height: `${lensStyle.height}px`
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Floating Zoom Box OR Product Purchase & Information */}
          <div className="pdp-info-column">
            {/* Right-Side Zoom Preview Box (visible when hovering any gallery image) */}
            {isZoomActive && (
              <div
                className="pdp-floating-zoom-panel"
                style={{
                  backgroundImage: `url(${zoomImgSrc})`,
                  backgroundPosition: `${zoomBgPos.x}% ${zoomBgPos.y}%`
                }}
              >
                <div className="zoom-hint-tag">2.5x Magnified Inspection</div>
              </div>
            )}

            {/* Product Title */}
            <h1 className="pdp-title">
              {product.name} – {product.dimensions.volumeLiters} L, {product.specifications.material},{' '}
              {product.subcategory || 'Ergonomic'}, {product.category.replace(/-/g, ' ')}
            </h1>

            {/* Rating & Review Line */}
            <div className="pdp-rating-strip">
              <div className="stars-pill">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? '#15803d' : 'none'}
                    color={i < Math.floor(product.rating) ? '#15803d' : '#86efac'}
                  />
                ))}
              </div>
              <span className="strip-divider">|</span>
              <span className="review-count-text">{product.reviewCount || 0} Reviews</span>
              <span className="strip-divider">|</span>
              <button
                type="button"
                className="write-review-link"
                onClick={() => setShowReviewModal(true)}
              >
                Write a Review
              </button>
            </div>

            {/* Price Line */}
            <div className="pdp-price-strip">
              <span className="sale-price">₹{activeVariant.price.toLocaleString('en-IN')}</span>
              {discountPercentage > 0 && (
                <span className="discount-badge">{discountPercentage}% off</span>
              )}
              {activeVariant.originalPrice > activeVariant.price && (
                <span className="original-price">
                  ₹{activeVariant.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Selected Color Section */}
            <div className="pdp-color-section">
              <div className="color-section-label">
                SELECTED COLOR: <strong>{activeVariant.colorName.toUpperCase()}</strong>
              </div>
              <div className="color-swatches-row">
                {product.variants.map((variant, idx) => (
                  <button
                    key={variant.id}
                    type="button"
                    className={`color-swatch-thumb ${selectedVariantIndex === idx ? 'active' : ''}`}
                    onClick={() => setSelectedVariantIndex(idx)}
                    title={variant.colorName}
                  >
                    {variant.images && variant.images[0] ? (
                      <img src={variant.images[0]} alt={variant.colorName} />
                    ) : (
                      <span
                        className="color-swatch-fill"
                        style={{ backgroundColor: variant.colorHex || '#1e293b' }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Section */}
            <div className="pdp-size-section">
              <div className="size-label">
                SIZE: <strong>FREE SIZE</strong>
              </div>
              <button type="button" className="size-pill active">
                FREE SIZE
              </button>
            </div>

            {/* Quantity Stepper */}
            <div className="pdp-quantity-section">
              <div className="quantity-label">QUANTITY</div>
              <div className="qty-stepper-box">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.min(activeVariant.stock, q + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* 4 Feature Highlights Cards */}
            <div className="pdp-feature-highlights-grid">
              <div className="feature-card">
                <div className="feature-card-icon">
                  <ShoppingBag size={20} strokeWidth={1.75} />
                </div>
                <div className="feature-card-value">{product.dimensions.volumeLiters} L</div>
                <div className="feature-card-label">Capacity</div>
              </div>

              <div className="feature-card">
                <div className="feature-card-icon">
                  <div className="custom-droplet-icon">💧</div>
                </div>
                <div className="feature-card-value">{product.specifications.material.split(' ')[0]}</div>
                <div className="feature-card-label">Material</div>
              </div>

              <div className="feature-card">
                <div className="feature-card-icon">
                  <Check size={20} strokeWidth={2.2} />
                </div>
                <div className="feature-card-value">{product.category.replace(/-/g, ' ')}</div>
                <div className="feature-card-label">Design</div>
              </div>

              <div className="feature-card">
                <div className="feature-card-icon">
                  <ShieldCheck size={20} strokeWidth={1.75} />
                </div>
                <div className="feature-card-value">Ergonomic</div>
                <div className="feature-card-label">Build</div>
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="pdp-action-buttons-row">
              <button type="button" onClick={handleAddToCart} className="btn-add-to-cart">
                <ShoppingBag size={18} />
                <span>ADD TO CART</span>
              </button>
              <button type="button" onClick={handleBuyNow} className="btn-buy-now">
                <Zap size={18} />
                <span>BUY NOW</span>
              </button>
            </div>

            {/* Check Delivery Availability */}
            <div className="pdp-delivery-card">
              <div className="delivery-card-title">
                <MapPin size={16} />
                <span>Check Delivery Availability</span>
              </div>
              <form onSubmit={handleCheckPincode} className="pincode-input-row">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit pincode"
                  className="pincode-field"
                />
                <button type="submit" className="pincode-check-btn">
                  Check
                </button>
              </form>
              <div className="pincode-footnote">
                {pincodeStatus || 'Enter pincode to check delivery & enable Buy Now'}
              </div>
            </div>

            {/* 4-Item Trust Strip */}
            <div className="pdp-trust-strip">
              <div className="trust-cell">
                <Truck size={22} className="trust-icon" />
                <div className="trust-text">
                  <strong>Free Delivery</strong>
                  <span>On orders above ₹499</span>
                </div>
              </div>

              <div className="trust-cell">
                <RotateCcw size={22} className="trust-icon" />
                <div className="trust-text">
                  <strong>7 Days Return</strong>
                  <span>Easy returns &amp; refunds</span>
                </div>
              </div>

              <div className="trust-cell">
                <ShieldCheck size={22} className="trust-icon" />
                <div className="trust-text">
                  <strong>100% Authentic</strong>
                  <span>Genuine products</span>
                </div>
              </div>

              <div className="trust-cell">
                <Headphones size={22} className="trust-icon" />
                <div className="trust-text">
                  <strong>Customer Support</strong>
                  <span>24x7 support</span>
                </div>
              </div>
            </div>

            {/* PRODUCT HIGHLIGHTS Table */}
            <div className="pdp-highlights-container">
              <h3 className="section-subheading">PRODUCT HIGHLIGHTS</h3>
              <table className="highlights-spec-table">
                <tbody>
                  <tr>
                    <td className="spec-name">Material</td>
                    <td className="spec-val">{product.specifications.material}</td>
                  </tr>
                  <tr>
                    <td className="spec-name">Capacity</td>
                    <td className="spec-val">{product.dimensions.volumeLiters} L</td>
                  </tr>
                  <tr>
                    <td className="spec-name">Gender</td>
                    <td className="spec-val">Unisex / All Ages</td>
                  </tr>
                  <tr>
                    <td className="spec-name">Pattern</td>
                    <td className="spec-val">Geometric / Solid Ergonomic</td>
                  </tr>
                  <tr>
                    <td className="spec-name">Backpack Style</td>
                    <td className="spec-val">New School &amp; Daily Urban Bags</td>
                  </tr>
                  <tr>
                    <td className="spec-name">Character</td>
                    <td className="spec-val">VELO Signature Series</td>
                  </tr>
                  <tr>
                    <td className="spec-name">Class / Grade</td>
                    <td className="spec-val">Standard to High School / College</td>
                  </tr>
                  <tr>
                    <td className="spec-name">Net Weight</td>
                    <td className="spec-val">{product.dimensions.weightGrams} g</td>
                  </tr>
                  <tr>
                    <td className="spec-name">Recommended Age</td>
                    <td className="spec-val">5+ Years to Adults</td>
                  </tr>
                  <tr>
                    <td className="spec-name">Country</td>
                    <td className="spec-val">{product.specifications.countryOfOrigin || 'India'}</td>
                  </tr>
                  <tr>
                    <td className="spec-name">GST</td>
                    <td className="spec-val">18% (Included in price)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* KEY FEATURES */}
            <div className="pdp-key-features-container">
              <h3 className="section-subheading">KEY FEATURES</h3>
              <div className="key-feature-items-list">
                <div className="key-feature-badge">
                  <div className="check-circle-icon">
                    <Check size={14} color="#ffffff" strokeWidth={3} />
                  </div>
                  <span>Padded Shoulder Straps</span>
                </div>
                <div className="key-feature-badge">
                  <div className="check-circle-icon">
                    <Check size={14} color="#ffffff" strokeWidth={3} />
                  </div>
                  <span>Multiple Compartments</span>
                </div>
                <div className="key-feature-badge">
                  <div className="check-circle-icon">
                    <Check size={14} color="#ffffff" strokeWidth={3} />
                  </div>
                  <span>Water-Resistant Outer Finish</span>
                </div>
                <div className="key-feature-badge">
                  <div className="check-circle-icon">
                    <Check size={14} color="#ffffff" strokeWidth={3} />
                  </div>
                  <span>Heavy-Duty Reinforced Zippers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <section className="pdp-description-block">
          <h2 className="pdp-description-title">Product Description</h2>
          <div className="pdp-description-content">
            <p>{product.description}</p>
            <p>{product.capacityVisualDescription}</p>
            <p>
              Crafted with high-tensile water-repellent shell fabric and reinforced stress points to
              ensure maximum durability during daily commutes, school routines, and weekend travel.
              Features orthopedic ergonomic back padding that distributes heavy load weights evenly
              across the torso.
            </p>
          </div>
        </section>

        {/* Divider Line */}
        <hr className="pdp-divider-line" />

        {/* You May Also Like Section */}
        <section className="pdp-recommendations-block">
          <div className="recommendations-header-row">
            <h2 className="recommendations-title">You May Also Like</h2>
            <div className="recommendations-nav-buttons">
              <button
                type="button"
                onClick={() => scrollRecommendations('left')}
                className="carousel-circle-btn"
                aria-label="Previous recommendations"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollRecommendations('right')}
                className="carousel-circle-btn"
                aria-label="Next recommendations"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="recommendations-track" ref={recommendationsTrackRef}>
            {relatedProducts.map((relProduct) => (
              <div key={relProduct.id} className="recommendation-card-wrapper">
                <ProductCard product={relProduct} />
              </div>
            ))}
          </div>
        </section>

        {/* Sticky Mobile Purchase Bar */}
        <div className="pdp-mobile-sticky-bar">
          <div className="sticky-price-meta">
            <span className="sticky-price">₹{activeVariant.price.toLocaleString('en-IN')}</span>
            <span className="sticky-variant">{activeVariant.colorName}</span>
          </div>
          <div className="sticky-btns">
            <button onClick={handleAddToCart} className="btn btn-outline btn-sm">
              <ShoppingBag size={14} /> Add
            </button>
            <button onClick={handleBuyNow} className="btn btn-primary btn-sm">
              Buy Now
            </button>
          </div>
        </div>

        {/* Write a Review Modal */}
        {showReviewModal && (
          <div className="review-modal-backdrop" onClick={() => setShowReviewModal(false)}>
            <div className="review-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Write a Verified Review</h3>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="modal-close-btn"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="modal-body">
                <p className="modal-product-name">{product.name}</p>
                <div className="rating-select-row">
                  <label>Your Rating:</label>
                  <div className="stars-input">
                    {[1, 2, 3, 4, 5].map((starNum) => (
                      <button
                        key={starNum}
                        type="button"
                        onClick={() => setUserReviewRating(starNum)}
                        className="star-rate-btn"
                      >
                        <Star
                          size={24}
                          fill={starNum <= userReviewRating ? '#f59e0b' : 'none'}
                          color={starNum <= userReviewRating ? '#f59e0b' : '#d1d5db'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  className="review-textarea"
                  rows={4}
                  placeholder="Share details of your experience with this bag..."
                  value={userReviewComment}
                  onChange={(e) => setUserReviewComment(e.target.value)}
                />
                <button
                  type="button"
                  className="submit-review-btn"
                  onClick={() => {
                    addToast({
                      type: 'success',
                      title: 'Review Submitted',
                      description: 'Thank you! Your verified review is published.'
                    });
                    setShowReviewModal(false);
                    setUserReviewComment('');
                  }}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
