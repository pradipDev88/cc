import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { useToastStore } from '../../store/useToastStore';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const addItemToCart = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  const handleWishlistToggle = (e: React.MouseEvent) => {
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

    addToast({
      type: 'success',
      title: 'Added to Shopping Bag',
      description: `${product.name} (${activeVariant.colorName})`
    });
  };

  const primaryImage = activeVariant.images[0];
  const secondaryImage = activeVariant.images[1] || primaryImage;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container */}
      <div className="card-media-wrapper">
        <Link to={`/product/${product.slug}`} className="card-image-link">
          <img
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            className="product-img"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="card-badges">
          {product.badges?.map((badge) => (
            <span key={badge} className={`badge badge-${badge.toLowerCase()}`}>
              {badge}
            </span>
          ))}
          {product.specifications.waterResistance !== 'None' && (
            <span className="badge badge-tech">WATERPROOF</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`card-wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isInWishlist ? '#b91c1c' : 'none'} color={isInWishlist ? '#b91c1c' : '#18181b'} />
        </button>

        {/* Quick Add To Bag Bar */}
        <button className="card-quick-add" onClick={handleQuickAdd}>
          <ShoppingBag size={16} /> Quick Add to Bag
        </button>
      </div>

      {/* Product Content Details */}
      <div className="card-details">
        {/* Brand & Rating */}
        <div className="card-sub-header">
          <span className="product-brand">{product.brand}</span>
          <div className="product-rating">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span className="rating-score">{product.rating}</span>
            <span className="review-count">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/product/${product.slug}`} className="product-title-link">
          <h3 className="product-title">{product.name}</h3>
        </Link>

        {/* Key Bag Specs Pill */}
        <div className="bag-specs-meta">
          <span className="spec-pill">{product.dimensions.volumeLiters} Liters</span>
          {product.specifications.laptopCompatibility !== 'None' && (
            <span className="spec-pill">Fits {product.specifications.laptopCompatibility}</span>
          )}
        </div>

        {/* Color Swatches - always occupies uniform slot for card height parity */}
        <div className="swatch-row">
          {product.variants.length > 1 ? (
            <>
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  className={`swatch-dot ${selectedVariantIndex === idx ? 'active' : ''}`}
                  style={{ backgroundColor: v.colorHex }}
                  title={v.colorName}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedVariantIndex(idx);
                  }}
                >
                  {selectedVariantIndex === idx && <Check size={10} color="#ffffff" />}
                </button>
              ))}
              <span className="swatch-count">+{product.variants.length} colors</span>
            </>
          ) : (
            <div className="single-color-indicator">
              <span
                className="swatch-dot static"
                style={{ backgroundColor: activeVariant.colorHex }}
                title={activeVariant.colorName}
              />
              <span className="single-color-name">{activeVariant.colorName}</span>
            </div>
          )}
        </div>

        {/* Price Row */}
        <div className="card-pricing">
          <span className="price-current">₹{product.currentPrice.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.currentPrice && (
            <>
              <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="price-discount">{product.discountPercentage}% OFF</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

