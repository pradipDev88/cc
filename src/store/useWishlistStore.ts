import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          set((state) => ({ items: [product, ...state.items] }));
        }
      },
      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((p) => p.id !== productId) }));
      },
      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId);
      },
      toggleWishlist: (product) => {
        const inList = get().isInWishlist(product.id);
        if (inList) {
          get().removeItem(product.id);
          return false;
        } else {
          get().addItem(product);
          return true;
        }
      },
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'velo-wishlist-storage'
    }
  )
);

