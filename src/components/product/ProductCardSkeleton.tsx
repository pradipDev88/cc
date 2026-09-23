import React from 'react';
import './ProductCardSkeleton.scss';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="product-card-skeleton">
      {/* Shimmering Image Box */}
      <div className="skeleton-media-box">
        <div className="skeleton-badge-pill" />
        <div className="skeleton-wishlist-circle" />
      </div>

      {/* Content Skeleton */}
      <div className="skeleton-info-body">
        {/* Category / Brand */}
        <div className="skeleton-line skeleton-brand" />

        {/* Product Title */}
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-title-short" />

        {/* Color Swatch Dots */}
        <div className="skeleton-swatches">
          <div className="skeleton-dot" />
          <div className="skeleton-dot" />
          <div className="skeleton-dot" />
        </div>

        {/* Price & Rating Row */}
        <div className="skeleton-price-row">
          <div className="skeleton-line skeleton-price" />
          <div className="skeleton-line skeleton-rating" />
        </div>
      </div>
    </div>
  );
};

