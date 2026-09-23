import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus } from '../types';
import { INITIAL_SAMPLE_ORDERS } from '../data/mockData';

interface OrderState {
  orders: Order[];
  activeOrder: Order | null;

  // Actions
  createOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  requestReturn: (orderId: string, reason: string) => void;
  getUserOrders: (userId: string) => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: INITIAL_SAMPLE_ORDERS,
      activeOrder: null,

      createOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
          activeOrder: order
        }));
      },

      updateOrderStatus: (orderId, status, note) => {
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id !== orderId) return o;
            const newTimeline = [
              ...o.timeline,
              {
                status,
                title: `Status updated to ${status.replace(/_/g, ' ')}`,
                description: note || `Order updated by logistics system on ${new Date().toLocaleTimeString()}`,
                timestamp: new Date().toLocaleString(),
                location: 'Operations Hub'
              }
            ];
            return { ...o, status, timeline: newTimeline };
          })
        }));
      },

      getOrderById: (orderId) => {
        return get().orders.find((o) => o.id === orderId || o.orderNumber === orderId);
      },

      requestReturn: (orderId, reason) => {
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id !== orderId) return o;
            return {
              ...o,
              status: 'RETURN_REQUESTED',
              returnReason: reason,
              returnStatus: 'PENDING',
              timeline: [
                ...o.timeline,
                {
                  status: 'RETURN_REQUESTED',
                  title: 'Return Request Registered',
                  description: `Pickup requested: "${reason}". Logistics partner will schedule reverse pickup.`,
                  timestamp: new Date().toLocaleString()
                }
              ]
            };
          })
        }));
      },

      getUserOrders: (userId) => {
        return get().orders.filter((o) => o.userId === userId || userId === 'cust-01');
      }
    }),
    {
      name: 'velo-orders-storage'
    }
  )
);

