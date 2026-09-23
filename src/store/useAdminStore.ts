import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Coupon, BannerSlide, AuditLogItem } from '../types';
import { INITIAL_COUPONS, INITIAL_BANNERS } from '../data/mockData';

interface AdminState {
  announcementText: string;
  isAnnouncementActive: boolean;
  coupons: Coupon[];
  banners: BannerSlide[];
  auditLogs: AuditLogItem[];
  
  // Actions
  setAnnouncement: (text: string, active: boolean) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  toggleCouponStatus: (id: string) => void;
  
  addBanner: (banner: BannerSlide) => void;
  updateBanner: (id: string, updated: Partial<BannerSlide>) => void;
  deleteBanner: (id: string) => void;
  
  addAuditLog: (log: Omit<AuditLogItem, 'id' | 'timestamp'>) => void;
}

const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    adminName: 'Ashish Ojha',
    adminEmail: 'admin@velobags.com',
    action: 'INITIALIZE_STORE',
    targetEntity: 'Catalog Management',
    details: 'Uploaded Winter 2026 Collection with 9 active bag styles.',
    timestamp: '2026-09-21 09:30 AM',
    ipAddress: '192.168.1.1'
  },
  {
    id: 'log-2',
    adminName: 'Ashish Ojha',
    adminEmail: 'admin@velobags.com',
    action: 'COUPON_CREATED',
    targetEntity: 'Promotions',
    details: 'Activated coupon "VELOFIRST" offering flat ₹300 OFF.',
    timestamp: '2026-09-22 11:15 AM',
    ipAddress: '192.168.1.1'
  }
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      announcementText: 'COMPLIMENTARY NATIONWIDE EXPRESS SHIPPING ON ALL ORDERS OVER ₹999 | CODE: VELOFIRST',
      isAnnouncementActive: true,
      coupons: INITIAL_COUPONS,
      banners: INITIAL_BANNERS,
      auditLogs: INITIAL_AUDIT_LOGS,

      setAnnouncement: (text, active) => set({ announcementText: text, isAnnouncementActive: active }),

      addCoupon: (coupon) => {
        set((state) => ({ coupons: [coupon, ...state.coupons] }));
      },

      deleteCoupon: (id) => {
        set((state) => ({ coupons: state.coupons.filter((c) => c.id !== id) }));
      },

      toggleCouponStatus: (id) => {
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === id ? { ...c, isActive: !c.isActive } : c
          )
        }));
      },

      addBanner: (banner) => {
        set((state) => ({ banners: [...state.banners, banner] }));
      },

      updateBanner: (id, updated) => {
        set((state) => ({
          banners: state.banners.map((b) => (b.id === id ? { ...b, ...updated } : b))
        }));
      },

      deleteBanner: (id) => {
        set((state) => ({ banners: state.banners.filter((b) => b.id !== id) }));
      },

      addAuditLog: (log) => {
        const newLog: AuditLogItem = {
          ...log,
          id: 'log-' + Date.now(),
          timestamp: new Date().toLocaleString()
        };
        set((state) => ({ auditLogs: [newLog, ...state.auditLogs] }));
      }
    }),
    {
      name: 'velo-admin-storage'
    }
  )
);

