import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AdminUser } from '../types';

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  loyaltyTier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  loyaltyPoints: number;
}

interface AuthState {
  // Customer Auth
  customer: CustomerUser | null;
  isCustomerAuthenticated: boolean;
  
  // Admin Auth (Strictly isolated - only accessible via /admin)
  admin: AdminUser | null;
  isAdminAuthenticated: boolean;
  
  // Actions
  customerLogin: (user: Partial<CustomerUser>) => void;
  customerLogout: () => void;
  
  adminLogin: (admin: AdminUser) => void;
  adminLogout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      customer: {
        id: 'cust-01',
        name: 'Ashish Ojha',
        email: 'ashish.ojha@example.com',
        phone: '+91 98765 43210',
        loyaltyTier: 'GOLD',
        loyaltyPoints: 1240
      },
      isCustomerAuthenticated: true,

      admin: null,
      isAdminAuthenticated: false,

      customerLogin: (userData) => {
        set({
          customer: {
            id: userData.id || 'cust-' + Date.now(),
            name: userData.name || 'Valued Collector',
            email: userData.email || 'customer@example.com',
            phone: userData.phone || '+91 99999 88888',
            loyaltyTier: 'SILVER',
            loyaltyPoints: 350
          },
          isCustomerAuthenticated: true
        });
      },

      customerLogout: () => {
        set({ customer: null, isCustomerAuthenticated: false });
      },

      adminLogin: (adminUser) => {
        set({ admin: adminUser, isAdminAuthenticated: true });
      },

      adminLogout: () => {
        set({ admin: null, isAdminAuthenticated: false });
      }
    }),
    {
      name: 'velo-auth-storage'
    }
  )
);

