import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { StorefrontLayout } from './layouts/StorefrontLayout';
import { AccountLayout } from './layouts/AccountLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Storefront Pages
import { HomePage } from './pages/storefront/HomePage';
import { ProductListingPage } from './pages/storefront/ProductListingPage';
import { ProductDetailPage } from './pages/storefront/ProductDetailPage';
import { CartPage } from './pages/storefront/CartPage';
import { CheckoutPage } from './pages/storefront/CheckoutPage';
import { OrderSuccessPage } from './pages/storefront/OrderSuccessPage';
import { TrackOrderPage } from './pages/storefront/TrackOrderPage';
import { WishlistPage } from './pages/storefront/WishlistPage';
import { AboutPage } from './pages/storefront/AboutPage';
import { ContactPage } from './pages/storefront/ContactPage';

// Account Pages
import { AccountOverview } from './pages/account/AccountOverview';
import { UserOrdersPage } from './pages/account/UserOrdersPage';
import { UserCouponsPage } from './pages/account/UserCouponsPage';
import { UserRewardsPage } from './pages/account/UserRewardsPage';
import { UserSettingsPage } from './pages/account/UserSettingsPage';

// Admin Pages
import { AdminDashboardHome } from './pages/admin/AdminDashboardHome';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminAddProductPage } from './pages/admin/AdminAddProductPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminCouponsPage } from './pages/admin/AdminCouponsPage';
import { AdminBannersPage } from './pages/admin/AdminBannersPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Common Utilities
import { Preloader } from './components/common/Preloader';
import { ScrollToTop } from './components/common/ScrollToTop';

export const App: React.FC = () => {
  const [showPreloader, setShowPreloader] = React.useState(true);

  return (
    <BrowserRouter>
      {/* Scroll restoration: guarantees every navigation starts at page top */}
      <ScrollToTop />
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}
      <Routes>
        {/* 1. CUSTOMER STOREFRONT ROUTES */}
        <Route element={<StorefrontLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/category/:slug" element={<ProductListingPage />} />
          <Route path="/collections/:slug" element={<ProductListingPage />} />
          <Route path="/search" element={<ProductListingPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/track-order/:id" element={<TrackOrderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<ProductListingPage />} />
        </Route>

        {/* 2. CUSTOMER ACCOUNT / USER DASHBOARD */}
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<AccountOverview />} />
          <Route path="orders" element={<UserOrdersPage />} />
          <Route path="orders/:id" element={<TrackOrderPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="addresses" element={<UserSettingsPage />} />
          <Route path="coupons" element={<UserCouponsPage />} />
          <Route path="rewards" element={<UserRewardsPage />} />
          <Route path="returns" element={<UserOrdersPage />} />
          <Route path="reviews" element={<AccountOverview />} />
          <Route path="settings" element={<UserSettingsPage />} />
        </Route>

        {/* 3. ADVANCED ADMIN COMMAND CENTER (Strictly accessible at /admin without any public storefront links) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardHome />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/new" element={<AdminAddProductPage />} />
          <Route path="inventory" element={<AdminInventoryPage />} />
          <Route path="coupons" element={<AdminCouponsPage />} />
          <Route path="banners" element={<AdminBannersPage />} />
          <Route path="audit-logs" element={<AdminAuditLogsPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

