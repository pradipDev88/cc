import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discountAmount: number;
  freeShippingThreshold: number;
  isOpenMiniCart: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  setMiniCartOpen: (open: boolean) => void;
  
  // Computations
  getSubtotal: () => number;
  getTotalItems: () => number;
  getShippingCharge: () => number;
  getFinalTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discountAmount: 0,
      freeShippingThreshold: 999,
      isOpenMiniCart: false,

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.variantId === item.variantId
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            const currentItem = updated[existingIndex];
            const newQty = Math.min(currentItem.quantity + quantity, currentItem.maxStock);
            updated[existingIndex] = { ...currentItem, quantity: newQty };
            return { items: updated, isOpenMiniCart: true };
          }

          const newItem: CartItem = {
            ...item,
            quantity: Math.min(quantity, item.maxStock || 99)
          };
          return { items: [...state.items, newItem], isOpenMiniCart: true };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          )
        }));
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity: Math.min(quantity, i.maxStock) }
              : i
          )
        }));
      },

      clearCart: () => set({ items: [], couponCode: null, discountAmount: 0 }),

      applyCoupon: (code, discount) => set({ couponCode: code, discountAmount: discount }),
      
      removeCoupon: () => set({ couponCode: null, discountAmount: 0 }),

      setMiniCartOpen: (open) => set({ isOpenMiniCart: open }),

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getShippingCharge: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= get().freeShippingThreshold ? 0 : 99;
      },

      getFinalTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShippingCharge();
        const discount = get().discountAmount;
        return Math.max(0, subtotal - discount + shipping);
      }
    }),
    {
      name: 'velo-cart-storage'
    }
  )
);

