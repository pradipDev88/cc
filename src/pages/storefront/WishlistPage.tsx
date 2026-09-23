import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { useToastStore } from '../../store/useToastStore';
import { ProductCard } from '../../components/product/ProductCard';
import './WishlistPage.scss';

export const WishlistPage: React.FC = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItemToCart = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  if (items.length === 0) {
    return (
      <div className="wishlist-empty-container container">
        <Heart size={56} className="empty-icon" />
        <h1 className="heading-1">Your Curated Wishlist is Empty</h1>
        <p className="lead">
          Save your favorite backpacks, briefcases, and travel bags to review or purchase at your convenience.
        </p>
        <Link to="/products" className="btn btn-primary btn-lg">
          Explore Carry Collections
        </Link>
      </div>
    );
  }

  const handleMoveToBag = (product: any) => {
    const variant = product.variants[0];
    addItemToCart(
      {
        id: `${product.id}-${variant.id}`,
        productId: product.id,
        productSlug: product.slug,
        name: product.name,
        brand: product.brand,
        category: product.category,
        variantId: variant.id,
        colorName: variant.colorName,
        colorHex: variant.colorHex,
        image: variant.images[0],
        price: variant.price,
        originalPrice: variant.originalPrice,
        maxStock: variant.stock,
        capacity: variant.capacity
      },
      1
    );

    removeItem(product.id);
    addToast({
      type: 'success',
      title: 'Transferred to Bag',
      description: `${product.name} moved to shopping bag.`
    });
  };

  return (
    <div className="wishlist-page container">
      <div className="wishlist-header">
        <div>
          <h1 className="heading-1">My Curated Wishlist</h1>
          <p className="item-count">{items.length} saved carry pieces</p>
        </div>
        <button onClick={clearWishlist} className="btn btn-outline btn-sm">
          Clear Wishlist
        </button>
      </div>

      <div className="wishlist-grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

