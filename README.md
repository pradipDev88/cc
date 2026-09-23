# VELO & CO. — Precision Ergonomic & Luxury Carry Systems

> A full-stack, enterprise-grade E-Commerce Web Application engineered for high-performance carry goods, backpacks, luggage, and executive accessories.

Built with **React 18**, **TypeScript**, **Vite 5**, **Modular SCSS**, **Zustand 5**, and **Recharts**.

---

## Table of Contents

1. [Overview & Architectural Highlights](#overview--architectural-highlights)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Storefront Pages & Sections](#storefront-pages--sections)
   - [Home Page](#home-page-)
   - [Product Listing Page (Catalog)](#product-listing-page-catalog-)
   - [Product Details Page (PDP)](#product-details-page-pdp-)
   - [Shopping Bag & Checkout Flow](#shopping-bag--checkout-flow)
   - [Order Success & Order Tracking](#order-success--order-tracking)
   - [Wishlist](#wishlist-)
   - [About Us (Brand Journey)](#about-us-brand-journey-)
   - [Contact Us](#contact-us-)
5. [Customer Account Dashboard](#customer-account-dashboard-account)
6. [Admin Command Center](#admin-command-center-admin)
7. [Global Components & UX Features](#global-components--ux-features)
8. [State Management Architecture](#state-management-architecture)
9. [Getting Started & Installation](#getting-started--installation)
10. [Build & Deployment](#build--deployment)

---

## Overview & Architectural Highlights

- **Pure Modular SCSS Design System**: Zero Tailwind CSS. Fully custom styling utilizing CSS variables, responsive design tokens, and modular SCSS files.
- **Strict Viewport Clipping**: Engineered with `overflow-x: clip` across `html`, `body`, `#root`, and layout wrappers, guaranteeing strictly **0 horizontal (X-axis) scrollbar bleed** across all screen sizes.
- **Auto-Adjustable 100vh / 100vw Hero**: Hero banner spans 100% of viewport height (`100vh`/`100dvh`) and width (`100vw`) on all screens—from mobile up to 4K Ultra-HD monitors.
- **Interactive Hover Zoom Lens**: High-definition e-commerce magnifying lens on product details that opens a dedicated 2.5x preview box on the right.
- **Skeleton Shimmer Loading**: High-fidelity skeleton cards matching the 4:5 card aspect ratio with animated gradient shimmer waves.
- **Scroll Entrance Reveal Engine**: IntersectionObserver-powered staggered cascade animation as cards scroll into view.
- **Admin Command Center**: Complete back-office suite at `/admin` (inventory, orders, products, banners, coupons, customer directory, audit logs, and analytics). Public storefront contains no administrative links.

---

## Tech Stack

| Layer                    | Technologies                                                                   |
| ------------------------ | ------------------------------------------------------------------------------ |
| **Framework & UI**       | React 18.3.1, TypeScript 5.6.3, Vite 5.4.11                                    |
| **Routing**              | React Router DOM 6.28.0 (Nested layouts, protected routes, dynamic parameters) |
| **State Management**     | Zustand 5.0.1 with LocalStorage Persistence (`persist` middleware)             |
| **Styling**              | Sass/SCSS 1.81.0 (BEM methodology, responsive mixins, custom CSS variables)    |
| **Icons & Media**        | Lucide React 0.460.0, Canvas Confetti 1.9.4                                    |
| **Analytics & Data Vis** | Recharts 2.13.3 (Area charts, bar charts, revenue graphs)                      |

---

## Project Structure

```
src/
├── App.tsx                           # Root router and layout declarations
├── main.tsx                          # Vite bootstrap entry point
├── components/
│   ├── cart/
│   │   ├── MiniCartDrawer.tsx        # Slide-over quick cart drawer with threshold tracker
│   │   └── MiniCartDrawer.scss
│   ├── common/
│   │   ├── Preloader.tsx             # Interactive animated bag assembly preloader
│   │   ├── Preloader.scss
│   │   ├── ScrollReveal.tsx          # 3D viewport reveal container
│   │   ├── ScrollReveal.scss
│   │   ├── ToastContainer.tsx        # Stacked toast notification system
│   │   └── ToastContainer.scss
│   ├── product/
│   │   ├── ProductCard.tsx           # Standardized product card with quick add & swatches
│   │   ├── ProductCard.scss
│   │   ├── ProductCardSkeleton.tsx   # 8-card shimmer loading placeholder
│   │   └── ProductCardSkeleton.scss
│   └── storefront/
│       ├── AnnouncementBar.tsx       # Live promotion marquee ticker
│       ├── AnnouncementBar.scss
│       ├── Header.tsx                # Brand logo, mega menu, search modal, action icons
│       ├── Header.scss
│       ├── Footer.tsx                # Structured footer with newsletter & legal links
│       ├── Footer.scss
│       ├── MobileBottomNav.tsx       # Persistent mobile app bottom navigation dock
│       └── MobileBottomNav.scss
├── data/
│   └── mockData.ts                   # 29 catalog products, coupons, banners, users
├── layouts/
│   ├── StorefrontLayout.tsx          # Public customer layout shell
│   ├── StorefrontLayout.scss
│   ├── AccountLayout.tsx             # Authenticated user account sidebar shell
│   ├── AccountLayout.scss
│   ├── AdminLayout.tsx               # Admin command center sidebar shell
│   └── AdminLayout.scss
├── pages/
│   ├── storefront/
│   │   ├── HomePage.tsx              # Landing page with hero, editorial banners, 4 sliders
│   │   ├── HomePage.scss
│   │   ├── ProductListingPage.tsx    # Catalog with filters, skeleton, load more
│   │   ├── ProductListingPage.scss
│   │   ├── ProductDetailPage.tsx     # 2-col gallery, hover zoom lens, specs table
│   │   ├── ProductDetailPage.scss
│   │   ├── CartPage.tsx              # Full cart with shipping progress & coupon input
│   │   ├── CartPage.scss
│   │   ├── CheckoutPage.tsx          # Multi-step checkout with address & payment options
│   │   ├── CheckoutPage.scss
│   │   ├── OrderSuccessPage.tsx      # Confetti celebration & itemized receipt
│   │   ├── OrderSuccessPage.scss
│   │   ├── TrackOrderPage.tsx        # Visual order fulfillment timeline
│   │   ├── TrackOrderPage.scss
│   │   ├── WishlistPage.tsx          # Saved products collection
│   │   ├── WishlistPage.scss
│   │   ├── AboutPage.tsx             # Animated brand story, heritage & craftsmanship
│   │   ├── AboutPage.scss
│   │   ├── ContactPage.tsx           # Support channels, inquiry form & FAQ accordion
│   │   └── ContactPage.scss
│   ├── account/
│   │   ├── AccountOverview.tsx       # Profile snapshot, points balance, recent orders
│   │   ├── UserOrdersPage.tsx        # Order history with direct tracking links
│   │   ├── UserCouponsPage.tsx       # Promo codes wallet with copy action
│   │   ├── UserRewardsPage.tsx       # Loyalty points breakdown & tiers
│   │   └── UserSettingsPage.tsx      # Personal information & address book
│   └── admin/
│       ├── AdminDashboardHome.tsx    # Financial analytics & inventory health graphs
│       ├── AdminProductsPage.tsx     # Catalog table with filters & stock controls
│       ├── AdminAddProductPage.tsx   # Comprehensive new product creator form
│       ├── AdminOrdersPage.tsx       # Order pipeline management & status progression
│       ├── AdminInventoryPage.tsx    # Rapid stock increment / decrement matrix
│       ├── AdminCouponsPage.tsx      # Coupon campaign generator
│       ├── AdminBannersPage.tsx      # Homepage hero slide manager
│       ├── AdminAuditLogsPage.tsx    # Chronological admin action log
│       ├── AdminCustomersPage.tsx    # Customer CRM table & lifetime metrics
│       └── AdminSettingsPage.tsx     # Store operational settings & tax rules
├── store/
│   ├── useProductStore.ts            # Products, category filtering, search state
│   ├── useCartStore.ts               # Shopping cart, item quantities, applied coupons
│   ├── useWishlistStore.ts           # Saved favorites toggle & storage
│   ├── useOrderStore.ts              # Placed customer orders & status updates
│   ├── useAdminStore.ts              # Banners, coupons, inventory adjustments, logs
│   ├── useAuthStore.ts               # User & admin session state
│   └── useToastStore.ts              # Global floating toast messages
├── styles/
│   └── global.scss                   # Global design tokens, typography, utilities
└── types/
    └── index.ts                      # Full TypeScript interfaces & domain models
```

---

## Storefront Pages & Sections

### Home Page (`/`)

1. **Scroll Progress Line**: Real-time thin gold/bronze indicator tracking scroll progress across the window.
2. **Hero Campaign Slider**:
   - Viewport: `100vh` / `100dvh` height and `100vw` width auto-adjustable across all devices (mobile, laptop, desktop, 4K).
   - Left-aligned luxury typography with seasonal collection badges.
   - Dual Call-to-Actions: `EXPLORE BACKPACKS` and `VIEW BEST SELLERS`.
   - Continuous 5-second autoplay engine with automatic pause on mouse hover.
   - Slide indicators and circular next/previous controls with safe insets for mobile docks.
3. **Curated Product Categories Grid**:
   - 6 category feature cards with model counts and hover zoom scale (School Bags, Laptop Tech Packs, Office Briefcases, Sculpted Handbags, Modular Slings, Polycarbonate Spinners).
4. **School Bags Continuous Autoplay Slider**:
   - 7 curated orthopedic school models with continuous auto-advance and wrap-around.
5. **Atelier Craftsmanship Editorial Banner**:
   - Split photography highlighting 1000D Cordura weave, magnetic Fidlock hardware, and waterproof YKK zips.
6. **Office & Laptop Bags Continuous Autoplay Slider**:
   - 7 executive models featuring drop-tested laptop partitions and TSA 180° clamshell openings.
7. **Nomadic Expeditions Editorial Banner**:
   - Full-width lifestyle banner featuring indestructible Makrolon polycarbonate luggage and weekender duffles.
8. **Travel & Luggage Continuous Autoplay Slider**:
   - 7 travel duffles and spinner suitcases with smooth auto-scroll.
9. **Handbags & Sculpted Slings Continuous Autoplay Slider**:
   - 7 architectural totes and modular chest slings.
10. **Core Brand Assurances Grid**:
    - 4 value propositions: Orthopedic Spine Relief, Weatherproof Shells, 2-5 Year Warranty, and Free Carbon-Neutral Delivery.

---

### Product Listing Page / Catalog (`/products`, `/category/:slug`)

1. **Breadcrumbs & Header**:
   - Dynamic path showing current category or search query with live matching item count.
2. **Controls Bar**:
   - Mobile filter trigger modal button.
   - Sort dropdown: Recommended, Newest Arrivals, Price: Low to High, Price: High to Low, Highest Rated, Biggest Discount.
3. **Refine Results Sidebar**:
   - Multi-select Category checkboxes.
   - Bag Capacity chips (`Under 10L`, `10-20L`, `20-30L`, `30-40L`, `40L+`).
   - Laptop Partition Size chips (`None`, `11"`, `13"`, `14"`, `15.6"`, `16"`, `17"`).
   - Textile & Leather multi-select (`Cordura`, `Ballistic Nylon`, `Full-Grain Leather`, `Vegan PU`, `Recycled Eco-Fabric`).
   - Water Resistant / Waterproof toggle switch.
   - Reset All Filters action button.
4. **Shimmer Skeleton Loading**:
   - Displays 8 realistic skeleton placeholders (`ProductCardSkeleton`) with moving gradient shimmer animations on mount and during filter switches.
5. **One-by-One Staggered Scroll Animations**:
   - `AnimatedCardItem` wraps every product card using `IntersectionObserver`, cascading cards into view with physics-based spring transitions.
6. **8-Card Pagination & Load More CTA**:
   - Displays strictly **8 cards initially**.
   - Progress bar tracker: `Viewing X of Y Products (Z%)`.
   - **Load More Products** button (+8 cards per click) with loading spinner.
   - End-of-catalog completion indicator: `✓ You have viewed all [N] products`.

---

### Product Details Page (PDP) (`/product/:slug`)

1. **2-Column Image Gallery Grid**:
   - 2-column responsive layout displaying multiple high-resolution perspectives.
   - Profile angle includes dimension indicator overlays (`42 cm` height, `14 cm` width).
2. **Interactive Right-Side Hover Zoom Lens**:
   - Hovering over any image in the gallery activates a square tracking cursor lens.
   - A dedicated **Zoom Preview Box** floats on the right side at 2.5x magnification (`background-size: 260% 260%`), smoothly panning in sync with mouse movement.
   - Moving the cursor outside immediately closes the zoom preview.
3. **Product Title & Review Summary**:
   - Structured naming with capacity, materials, and usage category.
   - Green star rating badge + verified buyer review count + clickable **Write a Review** link with rating modal.
4. **Pricing Block**:
   - Bold sale price (e.g. `₹2,198`), discount percentage badge (`32% off`), and strikethrough original price (`₹3,232`).
5. **Color & Variant Selection**:
   - `SELECTED COLOR: [COLOR NAME]` with square thumbnail swatches featuring active border rings.
6. **Size & Stepper**:
   - `SIZE: FREE SIZE` button badge + square quantity stepper `[- 1 +]`.
7. **4-Card Feature Highlights Strip**:
   - Side-by-side cards: Capacity (`30 L`), Material (`PU Leather`), Design (`New School Bags`), Build (`Ergonomic`).
8. **Action Buttons**:
   - Solid dark `ADD TO CART` (with shopping bag icon) and outline `BUY NOW` (with lightning bolt icon).
9. **Doorstep Delivery Availability**:
   - 6-digit postal pincode validator with instant feedback.
10. **Trust Badges Strip**:
    - Free Delivery (>₹499), 7 Days Return, 100% Authentic, and 24x7 Customer Support.
11. **PRODUCT HIGHLIGHTS Table**:
    - Zebra-striped specification table: Material, Capacity, Gender, Pattern, Backpack Style, Character, Class/Grade, Net Weight, Recommended Age, Country of Origin, and GST (18%).
12. **KEY FEATURES**:
    - Rounded pills with green checkmarks (Padded Shoulder Straps, Multiple Compartments, Water-Resistant Finish, Reinforced Zippers).
13. **Product Description**:
    - Typography block with a signature gold/bronze accent underline beneath the heading.
14. **You May Also Like Carousel**:
    - Recommended products slider with circular `<` and `>` arrow navigation buttons and product cards displaying `NEW` badges.
15. **Sticky Mobile Purchase Bar**:
    - Fixed bar above mobile bottom nav for single-tap checkout on mobile screens.

---

### Shopping Bag & Checkout Flow

- **Mini Cart Drawer (`MiniCartDrawer.tsx`)**:
  - Slide-over panel accessible from any page.
  - Free shipping progress bar (`Free delivery unlocked above ₹999`).
  - Item list with quantity steppers and remove triggers.
  - Coupon code entry field (`VELO10` for 10% off).
  - Subtotal, discount deductions, estimated taxes, and `Proceed to Checkout` CTA.
- **Cart Page (`/cart`)**:
  - Full-page shopping bag overview with itemized table, total weight summary, and gift wrap options.
- **Checkout Page (`/checkout`)**:
  - Three-step accordion form:
    1. Shipping & Doorstep Delivery Address (full name, phone, address, 6-digit PIN).
    2. Delivery Speed (Standard Free Shipping or Express Air Dispatch).
    3. Payment Method (Credit/Debit Card, UPI / QR, Net Banking, Cash on Delivery).
  - Real-time cart total summary with coupon recalculations.

---

### Order Success & Order Tracking

- **Order Success Page (`/order-success`)**:
  - Fires canvas confetti animation upon arrival.
  - Generates official Order Number (e.g. `VLO-847291`).
  - Summarizes delivery address, payment method, estimated delivery dates, and direct order tracking button.
- **Track Order Page (`/track-order/:id`)**:
  - Visual 5-stage progress timeline:
    1. `Order Placed`
    2. `Quality Inspection & Packaging`
    3. `Dispatched from Atelier`
    4. `Out for Delivery`
    5. `Delivered to Doorstep`
  - Real-time timestamp history and courier airway bill details.

---

### Wishlist (`/wishlist`)

- Grid of saved favorites synced to browser localStorage.
- Quick actions: **Move to Bag** and **Remove**.
- Empty state with direct "Explore Catalog" CTA.

---

### About Us (Brand Journey) (`/about`)

- **Hero Narrative**: The story of VELO & CO. founded to eliminate back fatigue through orthopedic industrial engineering.
- **Interactive Chronological Timeline**: Milestones from early material research to international design awards.
- **Craftsmanship Principles**: Detail cards covering S-Curve suspension straps, ballistic weaves, and marine-grade stitching.
- **Sustainability Guarantee**: 100% recycled nylon linings and carbon-neutral logistics.

---

### Contact Us (`/contact`)

- **Direct Support Channels**: Toll-free phone concierge, priority email, and office address.
- **Interactive Inquiry Form**: Validated form with inquiry topics (Order Status, Warranty Claim, Corporate Gifting, General Feedback) with instant toast notifications.
- **FAQ Accordion**: 6 collapsible answer sections covering returns, international shipping, and cleaning recommendations.

---

## Customer Account Dashboard (`/account`)

- **Account Overview (`/account`)**:
  - Welcome card, active membership tier, loyalty points balance, and latest order status.
- **Order History (`/account/orders`)**:
  - Historical orders list with status pills, order IDs, item counts, totals, and tracking links.
- **Coupons & Rewards (`/account/coupons`, `/account/rewards`)**:
  - Active vouchers with one-click copy and reward point redemption milestones.
- **Saved Addresses & Settings (`/account/settings`)**:
  - Delivery address book, phone verification, and email preferences.

---

## Admin Command Center (`/admin`)

> **Note**: Strictly accessible via `/admin`. Hidden from all public customer storefront menus and footers.

| Admin Module              | Route                 | Functionality                                                                                                                                                                             |
| ------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Executive Dashboard**   | `/admin`              | Key performance indicators (Gross Revenue, Total Orders, Average Order Value, Active Customers), low-stock warning banners, and interactive monthly revenue charts powered by Recharts.   |
| **Product Catalog**       | `/admin/products`     | Searchable product table with category filters, live stock status indicators, quick price editor, and deletion actions.                                                                   |
| **New Product Creator**   | `/admin/products/new` | Multi-field form for creating bags: Name, category, subcategory, pricing, capacity, dimensions (height, width, depth, weight), features, specifications, and multi-image variant manager. |
| **Order Management**      | `/admin/orders`       | Fulfillment status pipeline: Update orders between `Pending`, `Processing`, `Shipped`, `Delivered`, and `Cancelled`.                                                                      |
| **Live Inventory Matrix** | `/admin/inventory`    | Real-time stock audit with `+` / `-` steppers for instant replenishment and low-stock threshold alerts.                                                                                   |
| **Promotions & Coupons**  | `/admin/coupons`      | Campaign manager: Create coupon codes, discount percentages, minimum order requirements, and expiry dates.                                                                                |
| **Hero Banner Manager**   | `/admin/banners`      | Manage homepage hero slides: image URL, headline, subtitle, tagline, and call-to-action routing.                                                                                          |
| **Audit Logs**            | `/admin/audit-logs`   | Immutable chronological trail of all administrative actions (product edits, stock updates, order status changes).                                                                         |
| **Customer Directory**    | `/admin/customers`    | Customer relationship management table tracking registered users, contact info, total orders placed, and lifetime spend.                                                                  |
| **Store Settings**        | `/admin/settings`     | Store configuration: Brand contact details, standard tax percentage (GST 18%), and delivery fee thresholds.                                                                               |

---

## Global Components & UX Features

- **Interactive Preloader (`Preloader.tsx`)**:
  - Fullscreen loading sequence showing parts of a backpack dynamically assembling into a completed bag, picked up by a boy heading out, unlocking into the storefront.
- **Desktop 2-Row Stacked Brand Logo (`Header.tsx`)**:
  - On screens ≥ 1024px, the header logo stacks into two rows (`VELO` bold serif on line 1, `CO.` tracked uppercase on line 2). Adapts to inline horizontal baseline on mobile.
- **Full-Width Mega Menu with Luxury Insets (`Header.scss`)**:
  - Generous `44px 0 54px` padding ensuring navigation links and "View All" actions have ample clearance.
  - Hover underline indicators sit cleanly beneath the text without striking through words.
- **Multi-Toast Engine (`ToastContainer.tsx`)**:
  - Non-blocking bottom-right notifications for cart additions, wishlist updates, pincode status, and review submissions.

---

## State Management Architecture

All global application state is organized in modular Zustand stores with persistence:

- `useProductStore`: Manages 29 products, category/capacity/material/price filters, search queries, sort orders, and cached hydration safeguards.
- `useCartStore`: Manages shopping bag items, variant selections, quantity increments, applied coupon codes, and pricing math.
- `useWishlistStore`: Toggles and stores bookmarked products.
- `useOrderStore`: Stores placed orders, tracking milestones, and status progressions.
- `useAdminStore`: Manages admin banners, coupons, inventory adjustments, and audit activity logs.
- `useAuthStore`: Manages customer and administrator credentials and session states.
- `useToastStore`: Dispatches informational, success, and error floating toast notices.

---

## Getting Started & Installation

### Prerequisites

- Node.js (version 18.0.0 or higher recommended)
- npm or yarn

### 1. Clone the repository

```bash
git clone <repository-url>
cd cc
```

### 2. Install dependencies

```bash
npm install
```

### 3. Launch Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173/` (or port assigned by Vite).

---

## Build & Deployment

### Production Compilation

```bash
npm run build
```

Runs the TypeScript compiler (`tsc`) and Vite production bundler. Artifacts are generated in the `dist/` directory.

### Preview Production Build Locally

```bash
npm run preview -- --host 127.0.0.1 --port 3002
```

Serves the compiled production build from `dist/` at `http://127.0.0.1:3002/`.

---

© 2026 VELO & CO. All Rights Reserved. Engineered for School, Work, Travel & Everything In Between.
