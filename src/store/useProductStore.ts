import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, BagCategory, BagCapacity, LaptopSize, BagUsage, BagMaterial } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';

export interface FilterState {
  categories: BagCategory[];
  capacity: BagCapacity[];
  laptopSize: LaptopSize[];
  usage: BagUsage[];
  material: BagMaterial[];
  waterResistantOnly: boolean;
  minPrice: number;
  maxPrice: number;
  ratingMin: number;
  sortBy: 'featured' | 'newest' | 'price-low-high' | 'price-high-low' | 'rating' | 'discount';
  searchQuery: string;
}

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  capacity: [],
  laptopSize: [],
  usage: [],
  material: [],
  waterResistantOnly: false,
  minPrice: 0,
  maxPrice: 15000,
  ratingMin: 0,
  sortBy: 'featured',
  searchQuery: ''
};

interface ProductState {
  products: Product[];
  filters: FilterState;
  
  // Actions
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, variantId: string, delta: number) => void;
  
  // Filter Actions
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  toggleCategoryFilter: (category: BagCategory) => void;
  toggleCapacityFilter: (capacity: BagCapacity) => void;
  toggleLaptopFilter: (size: LaptopSize) => void;
  toggleUsageFilter: (usage: BagUsage) => void;
  toggleMaterialFilter: (material: BagMaterial) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  
  // Filtered selector
  getFilteredProducts: () => Product[];
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      filters: DEFAULT_FILTERS,

      setProducts: (products) => set({ products }),

      addProduct: (product) => {
        set((state) => ({ products: [product, ...state.products] }));
      },

      updateProduct: (id, updated) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p))
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id)
        }));
      },

      updateStock: (productId, variantId, delta) => {
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id !== productId) return p;
            const updatedVariants = p.variants.map((v) =>
              v.id === variantId ? { ...v, stock: Math.max(0, v.stock + delta) } : v
            );
            const totalStock = updatedVariants.reduce((sum, v) => sum + v.stock, 0);
            return { ...p, variants: updatedVariants, totalStock };
          })
        }));
      },

      setFilter: (key, value) => {
        set((state) => ({ filters: { ...state.filters, [key]: value } }));
      },

      toggleCategoryFilter: (category) => {
        set((state) => {
          const exists = state.filters.categories.includes(category);
          const categories = exists
            ? state.filters.categories.filter((c) => c !== category)
            : [...state.filters.categories, category];
          return { filters: { ...state.filters, categories } };
        });
      },

      toggleCapacityFilter: (capacity) => {
        set((state) => {
          const exists = state.filters.capacity.includes(capacity);
          const list = exists
            ? state.filters.capacity.filter((c) => c !== capacity)
            : [...state.filters.capacity, capacity];
          return { filters: { ...state.filters, capacity: list } };
        });
      },

      toggleLaptopFilter: (size) => {
        set((state) => {
          const exists = state.filters.laptopSize.includes(size);
          const list = exists
            ? state.filters.laptopSize.filter((s) => s !== size)
            : [...state.filters.laptopSize, size];
          return { filters: { ...state.filters, laptopSize: list } };
        });
      },

      toggleUsageFilter: (usage) => {
        set((state) => {
          const exists = state.filters.usage.includes(usage);
          const list = exists
            ? state.filters.usage.filter((u) => u !== usage)
            : [...state.filters.usage, usage];
          return { filters: { ...state.filters, usage: list } };
        });
      },

      toggleMaterialFilter: (material) => {
        set((state) => {
          const exists = state.filters.material.includes(material);
          const list = exists
            ? state.filters.material.filter((m) => m !== material)
            : [...state.filters.material, material];
          return { filters: { ...state.filters, material: list } };
        });
      },

      setSearchQuery: (query) => {
        set((state) => ({ filters: { ...state.filters, searchQuery: query } }));
      },

      resetFilters: () => set({ filters: DEFAULT_FILTERS }),

      getFilteredProducts: () => {
        const { products, filters } = get();
        let result = [...products];

        // Search Query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          result = result.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.specifications.material.toLowerCase().includes(q)
          );
        }

        // Category Filter
        if (filters.categories.length > 0) {
          result = result.filter((p) => filters.categories.includes(p.category));
        }

        // Capacity
        if (filters.capacity.length > 0) {
          result = result.filter((p) =>
            filters.capacity.includes(p.specifications.capacityCategory)
          );
        }

        // Laptop compatibility
        if (filters.laptopSize.length > 0) {
          result = result.filter((p) =>
            filters.laptopSize.includes(p.specifications.laptopCompatibility)
          );
        }

        // Material
        if (filters.material.length > 0) {
          result = result.filter((p) =>
            filters.material.includes(p.specifications.material)
          );
        }

        // Water resistance
        if (filters.waterResistantOnly) {
          result = result.filter(
            (p) => p.specifications.waterResistance !== 'None'
          );
        }

        // Price range
        result = result.filter(
          (p) => p.currentPrice >= filters.minPrice && p.currentPrice <= filters.maxPrice
        );

        // Sorting
        switch (filters.sortBy) {
          case 'newest':
            result.sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            break;
          case 'price-low-high':
            result.sort((a, b) => a.currentPrice - b.currentPrice);
            break;
          case 'price-high-low':
            result.sort((a, b) => b.currentPrice - a.currentPrice);
            break;
          case 'rating':
            result.sort((a, b) => b.rating - a.rating);
            break;
          case 'discount':
            result.sort((a, b) => b.discountPercentage - a.discountPercentage);
            break;
          default: // featured
            result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        }

        return result;
      }
    }),
    {
      name: 'velo-products-storage-v4',
      onRehydrateStorage: () => (state) => {
        if (state && (!state.products || state.products.length < INITIAL_PRODUCTS.length)) {
          state.products = INITIAL_PRODUCTS;
        }
      }
    }
  )
);

