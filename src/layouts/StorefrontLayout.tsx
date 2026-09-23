import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from '../components/storefront/AnnouncementBar';
import { Header } from '../components/storefront/Header';
import { Footer } from '../components/storefront/Footer';
import { MiniCartDrawer } from '../components/cart/MiniCartDrawer';
import { ToastContainer } from '../components/common/ToastContainer';
import { MobileBottomNav } from '../components/storefront/MobileBottomNav';
import './StorefrontLayout.scss';

export const StorefrontLayout: React.FC = () => {
  return (
    <div className="storefront-app-shell">
      <AnnouncementBar />
      <Header />
      <main className="storefront-main-viewport">
        <Outlet />
      </main>
      <Footer />
      <MiniCartDrawer />
      <MobileBottomNav />
      <ToastContainer />
    </div>
  );
};

