// Product Model
export type BagCategory =
  | 'school-bags'
  | 'backpacks'
  | 'laptop-bags'
  | 'office-bags'
  | 'handbags'
  | 'sling-bags'
  | 'travel-bags'
  | 'duffle-bags'
  | 'trolley-bags'
  | 'accessories'
  | 'exported'
  | 'generic';

export type BagCapacity = 'Under 10L' | '10-20L' | '20-30L' | '30-40L' | '40L+';
export type LaptopSize = 'None' | '11"' | '13"' | '14"' | '15.6"' | '16"' | '17"';
export type BagUsage = 'School' | 'College' | 'Office' | 'Travel' | 'Gym' | 'Daily' | 'Party';
export type BagMaterial = 'Ballistic Nylon' | 'Cordura Polyester' | 'Full-Grain Leather' | 'Waterproof Canvas' | 'Vegan PU' | 'Recycled Eco-Fabric';

export interface ProductVariant {
  id: string;
  colorName: string;
  colorHex: string;
  capacity?: string;
  sku: string;
  price: number;
  originalPrice: number;
  stock: number;
  images: string[];
}

export interface BagDimension {
  heightCm: number;
  widthCm: number;
  depthCm: number;
  weightGrams: number;
  volumeLiters: number;
}

export interface ReviewItem {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  status: 'approved' | 'pending' | 'rejected';
  images?: string[];
  reply?: string;
}

export interface QAItem {
  id: string;
  question: string;
  askedBy: string;
  answer: string;
  answeredBy: string;
  date: string;
  helpful: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  brand: string;
  category: BagCategory;
  subcategory: string;
  collections: string[];
  badges?: ('NEW' | 'BESTSELLER' | 'SALE' | 'LIMITED')[];
  description: string;
  features: string[];
  specifications: {
    material: BagMaterial;
    waterResistance: 'Water Resistant' | 'Waterproof' | 'Weather-Resistant' | 'None';
    laptopCompatibility: LaptopSize;
    capacityCategory: BagCapacity;
    compartmentsCount: number;
    closureType: string;
    handleType: string;
    strapType: string;
    warranty: string;
    countryOfOrigin: string;
  };
  dimensions: BagDimension;
  capacityVisualDescription: string;
  variants: ProductVariant[];
  currentPrice: number;
  originalPrice: number;
  discountPercentage: number;
  totalStock: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  createdAt: string;
}

// Cart & Order Models
export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  name: string;
  brand: string;
  category: BagCategory;
  variantId: string;
  colorName: string;
  colorHex: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  maxStock: number;
  capacity?: string;
}

export interface ShippingAddress {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'Home' | 'Office' | 'Other';
  isDefault: boolean;
}

export type OrderStatus =
  | 'PLACED'
  | 'CONFIRMED'
  | 'PACKED'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURN_REQUESTED'
  | 'RETURNED';

export interface OrderTimelineEvent {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  location?: string;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  name: string;
  colorName: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'UPI' | 'CARD' | 'NETBANKING' | 'WALLET' | 'COD';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED' | 'FAILED';
  deliveryMethod: 'STANDARD' | 'EXPRESS';
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingCharge: number;
  tax: number;
  totalAmount: number;
  status: OrderStatus;
  courierName?: string;
  trackingNumber?: string;
  estimatedDelivery: string;
  placedAt: string;
  timeline: OrderTimelineEvent[];
  internalNotes?: string;
  returnReason?: string;
  returnStatus?: 'PENDING' | 'APPROVED' | 'PICKED_UP' | 'REFUND_COMPLETED';
}

// User & Rewards
export interface UserReward {
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  points: number;
  nextTierPoints: number;
  history: {
    id: string;
    title: string;
    points: number;
    type: 'EARNED' | 'REDEEMED';
    date: string;
  }[];
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FLAT';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  validUntil: string;
  applicableCategory?: BagCategory | 'all';
  isActive: boolean;
  usageCount: number;
}

// Banner & CMS
export interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  mobileImageUrl?: string;
  categoryTag: string;
  sortOrder: number;
  isActive: boolean;
}

// Admin Models
export type AdminRole = 'SUPER_ADMIN' | 'CATALOG_MANAGER' | 'ORDER_MANAGER' | 'MARKETING_MANAGER' | 'SUPPORT_AGENT';

export interface AdminPermission {
  viewDashboard: boolean;
  manageProducts: boolean;
  manageOrders: boolean;
  manageInventory: boolean;
  manageCoupons: boolean;
  manageBanners: boolean;
  manageCustomers: boolean;
  manageReviews: boolean;
  manageSettings: boolean;
  manageRoles: boolean;
  viewAuditLogs: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar: string;
  lastLogin: string;
  isActive: boolean;
}

export interface AuditLogItem {
  id: string;
  adminName: string;
  adminEmail: string;
  action: string;
  targetEntity: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

