import { Product, Coupon, BannerSlide, AdminUser, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. School Bag
  {
    id: 'prod-school-01',
    slug: 'apex-ergonomic-school-backpack',
    name: 'Apex Orthopedic Pro School Backpack',
    subtitle: 'Triple-cushioned spine support with reflective safety piping',
    brand: 'VELO & CO.',
    category: 'school-bags',
    subcategory: 'Ergonomic School Backpacks',
    collections: ['back-to-school', 'best-sellers'],
    badges: ['BESTSELLER', 'NEW'],
    description: 'Engineered specifically for growing students carrying heavy textbooks. Features orthopedic S-curve contoured straps, dual water-repellent compartments, an insulated tiffin sleeve, and 360-degree reflective visibility bands for early morning safety.',
    features: [
      'Orthopedic spine-relief airmesh back panel',
      'Dual reinforced bottle holsters with compression clips',
      'Dedicated insulated front lunchbox pocket',
      'Reflective high-visibility accents for safety',
      'Tough abrasion-resistant bottom rubberized bumpers'
    ],
    specifications: {
      material: 'Cordura Polyester',
      waterResistance: 'Water Resistant',
      laptopCompatibility: '14"',
      capacityCategory: '20-30L',
      compartmentsCount: 4,
      closureType: 'Heavy-duty YKK Two-Way Zippers',
      handleType: 'Padded Neoprene Grab Handle',
      strapType: 'S-Curve Ergonomic Air-Mesh Straps',
      warranty: '2-Year Brand Replacement Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: {
      heightCm: 46,
      widthCm: 32,
      depthCm: 20,
      weightGrams: 680,
      volumeLiters: 28
    },
    capacityVisualDescription: 'Fits 5 heavy textbooks, 3 notebooks, 14" chromebook, insulated lunchbox, and a 1L water bottle comfortably.',
    variants: [
      {
        id: 'var-sc-1-navy',
        colorName: 'Midnight Navy & Electric Orange',
        colorHex: '#1e293b',
        capacity: '28L',
        sku: 'VLO-SCH-01-NVY',
        price: 1899,
        originalPrice: 2999,
        stock: 45,
        images: [
          'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop'
        ]
      },
      {
        id: 'var-sc-1-blk',
        colorName: 'Stealth Carbon Black',
        colorHex: '#0f172a',
        capacity: '28L',
        sku: 'VLO-SCH-01-BLK',
        price: 1899,
        originalPrice: 2999,
        stock: 32,
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 1899,
    originalPrice: 2999,
    discountPercentage: 36,
    totalStock: 77,
    rating: 4.8,
    reviewCount: 142,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-01-10'
  },

  // 2. Kids School Bag
  {
    id: 'prod-school-02',
    slug: 'junior-safari-waterproof-kids-bag',
    name: 'Junior Explorer Waterproof Kids Backpack',
    subtitle: 'Featherlight with chest harness & whistle buckle',
    brand: 'VELO & CO.',
    category: 'school-bags',
    subcategory: 'Kids Bags',
    collections: ['back-to-school'],
    badges: ['NEW'],
    description: 'Designed for primary classes (Ages 4-9). Ultralight construction weighs only 410 grams with an anti-sway sternum clip, waterproof inner coating, and playful embossed silicone badge.',
    features: [
      'Built-in emergency safety whistle on chest buckle',
      'Spill-proof waterproof interior lining',
      'Name & contact card slot inside main lid',
      'Smooth easy-glide silicone zipper pulls for small hands'
    ],
    specifications: {
      material: 'Recycled Eco-Fabric',
      waterResistance: 'Waterproof',
      laptopCompatibility: 'None',
      capacityCategory: '10-20L',
      compartmentsCount: 3,
      closureType: 'Kid-Safe Rounded Zippers',
      handleType: 'Cushioned Webbing',
      strapType: 'Adjustable Contoured Soft Strap',
      warranty: '1-Year Full Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: {
      heightCm: 38,
      widthCm: 28,
      depthCm: 14,
      weightGrams: 410,
      volumeLiters: 16
    },
    capacityVisualDescription: 'Fits 3 A4 drawing books, stationery kit, lunchbox, and 500ml water flask.',
    variants: [
      {
        id: 'var-sc-2-teal',
        colorName: 'Teal Adventure Green',
        colorHex: '#0d9488',
        capacity: '16L',
        sku: 'VLO-KID-02-TEA',
        price: 1299,
        originalPrice: 1999,
        stock: 58,
        images: [
          'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 1299,
    originalPrice: 1999,
    discountPercentage: 35,
    totalStock: 58,
    rating: 4.9,
    reviewCount: 89,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: '2024-02-14'
  },

  // 3. Laptop Bag / Work Backpack
  {
    id: 'prod-laptop-01',
    slug: 'sovereign-15-6-anti-theft-executive-backpack',
    name: 'Sovereign 15.6" Anti-Theft Executive Tech Pack',
    subtitle: 'Ballistic Nylon, TSA-approved 180° clamshell flat opening',
    brand: 'VELO & CO.',
    category: 'laptop-bags',
    subcategory: 'Executive Laptop Bags',
    collections: ['work-essentials', 'best-sellers'],
    badges: ['BESTSELLER'],
    description: 'The pinnacle of modern office mobility. Concealed rear zippers, RFID-blocking passport slot, integrated external USB-C fast charging port, and a patented cradle suspension chamber that suspends up to 15.6" laptops away from bottom drop impact.',
    features: [
      'TSA checkpoint-friendly 180° clamshell opening',
      'Pass-through luggage strap for rolling luggage',
      'Concealed security pocket against back panel',
      'USB-C external charge pass-through',
      'Crush-resistant top pocket for sunglasses & AirPods'
    ],
    specifications: {
      material: 'Ballistic Nylon',
      waterResistance: 'Water Resistant',
      laptopCompatibility: '15.6"',
      capacityCategory: '20-30L',
      compartmentsCount: 5,
      closureType: 'Concealed Lockable YKK Zippers',
      handleType: 'Reinforced Aluminum Core Leather Wrapped Handle',
      strapType: 'High-Density Memory Foam Shoulder Straps',
      warranty: 'Lifetime Limited Craftsmanship Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: {
      heightCm: 45,
      widthCm: 31,
      depthCm: 16,
      weightGrams: 920,
      volumeLiters: 24
    },
    capacityVisualDescription: 'Fits up to 15.6" or 16" MacBook Pro, iPad Pro 12.9", charging bricks, tech pouch, umbrella, and 1 change of shirt.',
    variants: [
      {
        id: 'var-lp-1-obsidian',
        colorName: 'Obsidian Matte Black',
        colorHex: '#18181b',
        capacity: '24L',
        sku: 'VLO-SOV-01-BLK',
        price: 3499,
        originalPrice: 5999,
        stock: 22,
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1200&auto=format&fit=crop'
        ]
      },
      {
        id: 'var-lp-1-slate',
        colorName: 'Gunmetal Slate Grey',
        colorHex: '#334155',
        capacity: '24L',
        sku: 'VLO-SOV-01-GRY',
        price: 3499,
        originalPrice: 5999,
        stock: 14,
        images: [
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 3499,
    originalPrice: 5999,
    discountPercentage: 41,
    totalStock: 36,
    rating: 4.9,
    reviewCount: 310,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-01-05'
  },

  // 4. Office Bag / Briefcase
  {
    id: 'prod-office-01',
    slug: 'atelier-leather-executive-briefcase',
    name: 'Atelier Artisan Full-Grain Leather Briefcase',
    subtitle: 'Handcrafted Tuscan pull-up leather with laptop partition',
    brand: 'VELO & CO. ATELIER',
    category: 'office-bags',
    subcategory: 'Leather Briefcases',
    collections: ['work-essentials', 'premium-selection'],
    badges: ['LIMITED'],
    description: 'An enduring statement of authority and craft. Tailored from vegetable-tanned full-grain leather that patinates richly with age. Features magnetic quick-release solid brass hardware and dedicated micro-suede tech sleeves.',
    features: [
      'Vegetable-tanned full-grain leather exterior',
      'Solid antique brushed brass buckles & hardware',
      'Plush micro-suede protective laptop lining',
      'Detachable ergonomic leather shoulder strap'
    ],
    specifications: {
      material: 'Full-Grain Leather',
      waterResistance: 'Weather-Resistant',
      laptopCompatibility: '15.6"',
      capacityCategory: '10-20L',
      compartmentsCount: 3,
      closureType: 'Flapover with Magnetic Quick-Release Clasp',
      handleType: 'Rolled Sculpted Leather Handles',
      strapType: 'Padded Adjustable Leather Sling Strap',
      warranty: '5-Year Atelier Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: {
      heightCm: 30,
      widthCm: 40,
      depthCm: 9,
      weightGrams: 1150,
      volumeLiters: 12
    },
    capacityVisualDescription: 'Fits 15.6" laptop, hardbound legal file folders, tablet, fountain pens, and slim notebook.',
    variants: [
      {
        id: 'var-of-1-cognac',
        colorName: 'Burnished Heritage Cognac',
        colorHex: '#9a6233',
        capacity: '12L',
        sku: 'VLO-BRF-01-CGN',
        price: 6499,
        originalPrice: 9999,
        stock: 9,
        images: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
        ]
      },
      {
        id: 'var-of-1-espresso',
        colorName: 'Dark Espresso Brown',
        colorHex: '#3d2b1f',
        capacity: '12L',
        sku: 'VLO-BRF-01-ESP',
        price: 6499,
        originalPrice: 9999,
        stock: 5,
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 6499,
    originalPrice: 9999,
    discountPercentage: 35,
    totalStock: 14,
    rating: 5.0,
    reviewCount: 64,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    createdAt: '2024-02-01'
  },

  // 5. Handbag / Ladies Bag
  {
    id: 'prod-handbag-01',
    slug: 'celeste-structured-vegan-leather-tote',
    name: 'Celeste Structured Architectural Tote',
    subtitle: 'Sculpted minimal silhouette with magnetic modular pouch',
    brand: 'VELO & CO. LUXE',
    category: 'handbags',
    subcategory: 'Structured Totes',
    collections: ['women-collection', 'new-arrivals'],
    badges: ['NEW'],
    description: 'Designed for the modern woman transitioning effortlessly from boardroom presentations to evening galas. Sculptural lines crafted from supple, scratch-proof vegan pebble leather with gold foil debossing.',
    features: [
      'Includes removable zippered organizer pouch with card slots',
      'Stable structured base with protective gold-toned metal feet',
      'Key leash with solid zinc snap hook',
      'Comfort-padded drop handles designed for coat clearance'
    ],
    specifications: {
      material: 'Vegan PU',
      waterResistance: 'Water Resistant',
      laptopCompatibility: '13"',
      capacityCategory: '10-20L',
      compartmentsCount: 2,
      closureType: 'Magnetic Bridge Closure',
      handleType: 'Flat Shoulder Carry Drop Straps',
      strapType: 'Non-removable Shoulder Straps',
      warranty: '1-Year Luxe Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: {
      heightCm: 32,
      widthCm: 38,
      depthCm: 14,
      weightGrams: 750,
      volumeLiters: 15
    },
    capacityVisualDescription: 'Fits 13" MacBook Air / iPad Pro, cosmetics pouch, water bottle, diary, sunglasses, and umbrella.',
    variants: [
      {
        id: 'var-hb-1-taupe',
        colorName: 'Sand Taupe & Cream',
        colorHex: '#d6c7b2',
        capacity: '15L',
        sku: 'VLO-TOT-01-TPE',
        price: 2799,
        originalPrice: 4499,
        stock: 28,
        images: [
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop'
        ]
      },
      {
        id: 'var-hb-1-noir',
        colorName: 'Jet Black Gloss',
        colorHex: '#111827',
        capacity: '15L',
        sku: 'VLO-TOT-01-NOI',
        price: 2799,
        originalPrice: 4499,
        stock: 35,
        images: [
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 2799,
    originalPrice: 4499,
    discountPercentage: 38,
    totalStock: 63,
    rating: 4.8,
    reviewCount: 94,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    createdAt: '2024-02-18'
  },

  // 6. Sling / Crossbody Bag
  {
    id: 'prod-sling-01',
    slug: 'aeroflex-modular-waterproof-crossbody-sling',
    name: 'AeroFlex Modular Waterproof Crossbody Sling',
    subtitle: 'Magnetic Fidlock clasp with ambidextrous reversible strap',
    brand: 'VELO & CO.',
    category: 'sling-bags',
    subcategory: 'Crossbody Bags',
    collections: ['travel-light', 'best-sellers'],
    badges: ['BESTSELLER'],
    description: 'Designed for hands-free urban traversal. Featuring ultra-durable ripstop Cordura, weatherproof taped zips, and an instantaneous quick-adjust strap mechanism allowing lightning-quick chest or back rotation.',
    features: [
      'Fidlock German magnetic quick-snap buckle',
      'Weatherproof seam-sealed zips',
      'Concealed passport / phone pocket facing body',
      'Self-compressing bottom cinch loops for light jacket'
    ],
    specifications: {
      material: 'Cordura Polyester',
      waterResistance: 'Waterproof',
      laptopCompatibility: '11"',
      capacityCategory: 'Under 10L',
      compartmentsCount: 3,
      closureType: 'Aquaguard Weatherproof Zippers',
      handleType: 'Top Webbing Grab Loop',
      strapType: 'Padded Ambidextrous Sling with Quick-Release',
      warranty: '2-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: {
      heightCm: 18,
      widthCm: 30,
      depthCm: 9,
      weightGrams: 320,
      volumeLiters: 6
    },
    capacityVisualDescription: 'Fits iPad mini / Kindle, compact camera, smartphone, powerbank, sunglasses, passport, and keys.',
    variants: [
      {
        id: 'var-sl-1-graphite',
        colorName: 'Tactical Graphite',
        colorHex: '#374151',
        capacity: '6L',
        sku: 'VLO-SLG-01-GRA',
        price: 1699,
        originalPrice: 2499,
        stock: 52,
        images: [
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
        ]
      },
      {
        id: 'var-sl-1-olive',
        colorName: 'Field Olive Green',
        colorHex: '#4d5d3e',
        capacity: '6L',
        sku: 'VLO-SLG-01-OLV',
        price: 1699,
        originalPrice: 2499,
        stock: 31,
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 1699,
    originalPrice: 2499,
    discountPercentage: 32,
    totalStock: 83,
    rating: 4.7,
    reviewCount: 168,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-01-20'
  },

  // 7. Travel Duffle Bag
  {
    id: 'prod-travel-01',
    slug: 'odyssey-hybrid-expandable-weekender-duffle',
    name: 'Odyssey Expandable 42L Hybrid Weekender Duffle',
    subtitle: 'Separate isolated ventilated shoe tunnel & garment divider',
    brand: 'VELO & CO.',
    category: 'duffle-bags',
    subcategory: 'Weekender Duffles',
    collections: ['pack-more', 'travel-light'],
    badges: ['BESTSELLER'],
    description: 'Built for 3 to 5-day itineraries and active athletic weekends. Includes an isolated, ventilated dirty laundry or shoe compartment, fold-out hideaway backpack straps, and water-repellent ballistic weave.',
    features: [
      'Ventilated side shoe chamber fits up to UK size 12',
      'Dual carry: Duffel handles or hidden backpack harness',
      'Suitcase trolley sleeve for stack-and-roll airport navigation',
      'Waterproof wet towel compartment'
    ],
    specifications: {
      material: 'Cordura Polyester',
      waterResistance: 'Water Resistant',
      laptopCompatibility: '15.6"',
      capacityCategory: '40L+',
      compartmentsCount: 6,
      closureType: 'Lockable Heavy YKK Double Zippers',
      handleType: 'Dual Magnetic Padded Top Handles',
      strapType: 'Concealable Ergonomic Backpack Straps + Detachable Sling',
      warranty: '3-Year Comprehensive Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: {
      heightCm: 28,
      widthCm: 54,
      depthCm: 26,
      weightGrams: 1100,
      volumeLiters: 42
    },
    capacityVisualDescription: 'Fits 4-5 pairs of outfits, 2 pairs of footwear, dopp kit, 15.6" laptop, gym gear, and travel documents.',
    variants: [
      {
        id: 'var-df-1-heather',
        colorName: 'Heather Ash Grey & Black',
        colorHex: '#475569',
        capacity: '42L',
        sku: 'VLO-DUF-01-ASH',
        price: 2999,
        originalPrice: 4999,
        stock: 24,
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 2999,
    originalPrice: 4999,
    discountPercentage: 40,
    totalStock: 24,
    rating: 4.8,
    reviewCount: 112,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-01-18'
  },

  // 8. Trolley / Travel Bag
  {
    id: 'prod-trolley-01',
    slug: 'vanguard-polycarbonate-cabin-trolley-spinner',
    name: 'Vanguard Aerospace Polycarbonate Cabin Spinner',
    subtitle: 'Silent Japanese Hinomoto 360° wheels with built-in TSA lock',
    brand: 'VELO & CO. TRAVEL',
    category: 'trolley-bags',
    subcategory: 'Hard Shell Spinners',
    collections: ['pack-more', 'premium-selection'],
    badges: ['BESTSELLER', 'LIMITED'],
    description: 'Virtually indestructible aerospace-grade Makrolon® polycarbonate shell engineered to flex under immense airline stress and bounce back scratch-free. Hinomoto 360-degree whisper-glide silent dual caster wheels.',
    features: [
      'Whisper-silent Japanese Hinomoto dual wheels',
      'Integrated recessed TSA combination lock',
      'Dual compression mesh panels with zip pockets',
      'Three-stage multi-height aviation-grade aluminum handle'
    ],
    specifications: {
      material: 'Recycled Eco-Fabric',
      waterResistance: 'Waterproof',
      laptopCompatibility: 'None',
      capacityCategory: '30-40L',
      compartmentsCount: 4,
      closureType: 'Puncture-Resistant Double Coil Zippers',
      handleType: 'Slow-Release Soft-Grip Rubber Handles',
      strapType: 'Interior Butterfly Compression Tie-Downs',
      warranty: '5-Year International Airline Damage Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: {
      heightCm: 55,
      widthCm: 37,
      depthCm: 23,
      weightGrams: 2800,
      volumeLiters: 38
    },
    capacityVisualDescription: 'Strict IATA airline cabin compliant. Holds 6-8 outfits, toiletries, footwear, and accessories.',
    variants: [
      {
        id: 'var-tr-1-titanium',
        colorName: 'Brushed Titanium Silver',
        colorHex: '#94a3b8',
        capacity: '38L',
        sku: 'VLO-TRL-01-SIL',
        price: 5999,
        originalPrice: 8999,
        stock: 18,
        images: [
          'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop'
        ]
      },
      {
        id: 'var-tr-1-midnight',
        colorName: 'Midnight Deep Blue',
        colorHex: '#1e3a8a',
        capacity: '38L',
        sku: 'VLO-TRL-01-BLU',
        price: 5999,
        originalPrice: 8999,
        stock: 11,
        images: [
          'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 5999,
    originalPrice: 8999,
    discountPercentage: 33,
    totalStock: 29,
    rating: 4.9,
    reviewCount: 78,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-01-25'
  },

  // 9. Wallet / Accessories
  {
    id: 'prod-acc-01',
    slug: 'monaco-rfid-bifold-leather-wallet',
    name: 'Monaco Slim RFID-Shielded Leather Bifold Wallet',
    subtitle: 'Top-grain Nappa leather with pull-tab card ejection',
    brand: 'VELO & CO.',
    category: 'accessories',
    subcategory: 'Wallets',
    collections: ['accessories', 'best-sellers'],
    badges: ['BESTSELLER'],
    description: 'Eliminate pocket bulk. Holds up to 10 cards and flat currency bills while maintaining a svelte 8mm profile. Embedded military-grade 13.56 MHz RFID blocking mesh prevents electronic pickpocketing.',
    features: [
      'Ultra-slim 8mm profile holds up to 10 cards + banknotes',
      'Quick-access exterior card slot with thumb slider',
      'Full RFID electronic theft shielding',
      'Hand-stitched perimeter with burnished edges'
    ],
    specifications: {
      material: 'Full-Grain Leather',
      waterResistance: 'None',
      laptopCompatibility: 'None',
      capacityCategory: 'Under 10L',
      compartmentsCount: 6,
      closureType: 'Slim Bifold',
      handleType: 'Pocket Fit',
      strapType: 'None',
      warranty: '2-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: {
      heightCm: 8,
      widthCm: 10.5,
      depthCm: 0.8,
      weightGrams: 65,
      volumeLiters: 0.2
    },
    capacityVisualDescription: 'Fits 8-10 cards, 12 currency notes without stretching or bulging.',
    variants: [
      {
        id: 'var-wl-1-tan',
        colorName: 'Vintage Saddle Tan',
        colorHex: '#b45309',
        capacity: 'Slim',
        sku: 'VLO-WLT-01-TAN',
        price: 899,
        originalPrice: 1499,
        stock: 75,
        images: [
          'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 899,
    originalPrice: 1499,
    discountPercentage: 40,
    totalStock: 75,
    rating: 4.8,
    reviewCount: 220,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-01-02'
  },

  // 10. School Bag 3
  {
    id: 'prod-school-03',
    slug: 'campus-glide-orthopedic-college-bag',
    name: 'CampusGlide Spine-Shield Daypack',
    subtitle: 'Triple-tier storage with air-mesh spine cushion & rain shield',
    brand: 'VELO & CO.',
    category: 'school-bags',
    subcategory: 'Ergonomic School Backpacks',
    collections: ['back-to-school'],
    badges: ['NEW'],
    description: 'A heavyweight carry capacity built with featherlight orthopedic suspension. Integrated reflective piping and rain hood keep textbooks safe.',
    features: ['Integrated waterproof rain cover in bottom pouch', 'Dual thermal bottle holders', 'Reflective 360° piping'],
    specifications: {
      material: 'Cordura Polyester',
      waterResistance: 'Water Resistant',
      laptopCompatibility: '15.6"',
      capacityCategory: '20-30L',
      compartmentsCount: 4,
      closureType: 'Two-way YKK Zippers',
      handleType: 'Molded Neoprene Grip',
      strapType: 'S-Curve Orthopedic Mesh Straps',
      warranty: '2-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 47, widthCm: 33, depthCm: 19, weightGrams: 710, volumeLiters: 27 },
    capacityVisualDescription: 'Fits 6 heavy textbooks, notebooks, lunchbox, 15.6" laptop, and 1L water bottle.',
    variants: [
      {
        id: 'var-sc-3-cobalt',
        colorName: 'Cobalt Royal Blue',
        colorHex: '#1d4ed8',
        capacity: '27L',
        sku: 'VLO-SCH-03-BLU',
        price: 1799,
        originalPrice: 2799,
        stock: 40,
        images: [
          'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 1799,
    originalPrice: 2799,
    discountPercentage: 35,
    totalStock: 40,
    rating: 4.7,
    reviewCount: 96,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: '2024-03-01'
  },

  // 11. School Bag 4
  {
    id: 'prod-school-04',
    slug: 'zenith-water-repellent-student-pack',
    name: 'Zenith High-Capacity Academic Pack',
    subtitle: 'High-density Ripstop fabric with reinforced base bumpers',
    brand: 'VELO & CO.',
    category: 'school-bags',
    subcategory: 'School Backpacks',
    collections: ['back-to-school'],
    badges: ['BESTSELLER'],
    description: 'Engineered for high schoolers with heavy workloads. Impact-resistant base bumpers prevent fabric tears when set on pavement.',
    features: ['High-density Ripstop weave', 'Padded stationery organizer pouch', 'Ergonomic lumbar support panel'],
    specifications: {
      material: 'Cordura Polyester',
      waterResistance: 'Water Resistant',
      laptopCompatibility: '14"',
      capacityCategory: '20-30L',
      compartmentsCount: 3,
      closureType: 'Heavy YKK Zippers',
      handleType: 'Cushioned Webbing',
      strapType: 'Contoured Air-Mesh Straps',
      warranty: '2-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 45, widthCm: 32, depthCm: 18, weightGrams: 640, volumeLiters: 26 },
    capacityVisualDescription: 'Fits 5 heavy textbooks, pencil pouch, 14" laptop, lunch kit, and water flask.',
    variants: [
      {
        id: 'var-sc-4-maroon',
        colorName: 'Crimson Burgundy',
        colorHex: '#881337',
        capacity: '26L',
        sku: 'VLO-SCH-04-BUR',
        price: 1649,
        originalPrice: 2499,
        stock: 55,
        images: [
          'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 1649,
    originalPrice: 2499,
    discountPercentage: 34,
    totalStock: 55,
    rating: 4.8,
    reviewCount: 118,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-02-20'
  },

  // 12. School Bag 5
  {
    id: 'prod-school-05',
    slug: 'trailblazer-junior-school-bag',
    name: 'Trailblazer Dual-Chamber Junior Pack',
    subtitle: 'Featherlight spine-contoured bag for middle school',
    brand: 'VELO & CO.',
    category: 'school-bags',
    subcategory: 'Kids Bags',
    collections: ['back-to-school'],
    badges: ['NEW'],
    description: 'Designed specifically for grades 4 to 8. Distributes load weight symmetrically across shoulder blades for injury prevention.',
    features: ['Featherlight design under 500g', 'Easy-pull rubberized tabs', 'Reflective night patch'],
    specifications: {
      material: 'Recycled Eco-Fabric',
      waterResistance: 'Waterproof',
      laptopCompatibility: 'None',
      capacityCategory: '10-20L',
      compartmentsCount: 3,
      closureType: 'Smooth Kid-Safe Zips',
      handleType: 'Padded Webbing',
      strapType: 'S-contoured Soft Padded Straps',
      warranty: '1-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 41, widthCm: 29, depthCm: 15, weightGrams: 480, volumeLiters: 18 },
    capacityVisualDescription: 'Fits 4 textbooks, 2 notebooks, tiffin box, and 750ml water bottle.',
    variants: [
      {
        id: 'var-sc-5-forest',
        colorName: 'Forest Pine Green',
        colorHex: '#14532d',
        capacity: '18L',
        sku: 'VLO-SCH-05-GRN',
        price: 1399,
        originalPrice: 2199,
        stock: 36,
        images: [
          'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 1399,
    originalPrice: 2199,
    discountPercentage: 36,
    totalStock: 36,
    rating: 4.9,
    reviewCount: 74,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: '2024-03-05'
  },

  // 13. School Bag 6
  {
    id: 'prod-school-06',
    slug: 'vanguard-spacious-study-backpack',
    name: 'Vanguard All-Weather Academic Pro',
    subtitle: 'Heavy-duty 900D waterproof fabric with insulated tiffin zone',
    brand: 'VELO & CO.',
    category: 'school-bags',
    subcategory: 'Ergonomic School Backpacks',
    collections: ['back-to-school', 'best-sellers'],
    badges: ['BESTSELLER'],
    description: 'The definitive daily student powerhouse. Includes a dedicated thermal compartment keeping home-cooked lunches warm until afternoon break.',
    features: ['Thermal insulated food chamber', 'Padded back airflow channels', 'Waterproof base barrier'],
    specifications: {
      material: 'Cordura Polyester',
      waterResistance: 'Waterproof',
      laptopCompatibility: '15.6"',
      capacityCategory: '20-30L',
      compartmentsCount: 4,
      closureType: 'YKK Heavy Zippers',
      handleType: 'Reinforced Top Handle',
      strapType: 'Wide Lumbar Padded Straps',
      warranty: '2-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 48, widthCm: 34, depthCm: 20, weightGrams: 750, volumeLiters: 30 },
    capacityVisualDescription: 'Fits 7 large textbooks, 15.6" laptop, insulated tiffin, pencil kit, and umbrella.',
    variants: [
      {
        id: 'var-sc-6-charcoal',
        colorName: 'Charcoal Shadow',
        colorHex: '#334155',
        capacity: '30L',
        sku: 'VLO-SCH-06-CHR',
        price: 1999,
        originalPrice: 3299,
        stock: 48,
        images: [
          'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 1999,
    originalPrice: 3299,
    discountPercentage: 39,
    totalStock: 48,
    rating: 4.9,
    reviewCount: 165,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-01-15'
  },

  // 14. School Bag 7
  {
    id: 'prod-school-07',
    slug: 'echo-ultralight-school-backpack',
    name: 'Echo Ultralight Ergonomic School Pack',
    subtitle: 'Anatomical back frame with breathable honey-comb mesh',
    brand: 'VELO & CO.',
    category: 'school-bags',
    subcategory: 'School Backpacks',
    collections: ['back-to-school'],
    badges: ['NEW'],
    description: 'Designed in consultation with orthopedic physiotherapists. Prevents slouching posture while supporting high textbook volumes.',
    features: ['Anatomical internal support stay', 'Dual bottle holsters', 'Quick-access key tether'],
    specifications: {
      material: 'Cordura Polyester',
      waterResistance: 'Water Resistant',
      laptopCompatibility: '14"',
      capacityCategory: '20-30L',
      compartmentsCount: 3,
      closureType: 'Smooth Glide Zippers',
      handleType: 'Cushioned Grip Handle',
      strapType: 'Contoured Honeycomb Mesh Straps',
      warranty: '2-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 44, widthCm: 31, depthCm: 17, weightGrams: 590, volumeLiters: 24 },
    capacityVisualDescription: 'Fits 5 school textbooks, 14" chromebook, stationery pouch, and 1L water bottle.',
    variants: [
      {
        id: 'var-sc-7-indigo',
        colorName: 'Deep Space Indigo',
        colorHex: '#1e1b4b',
        capacity: '24L',
        sku: 'VLO-SCH-07-IND',
        price: 1599,
        originalPrice: 2399,
        stock: 62,
        images: [
          'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 1599,
    originalPrice: 2399,
    discountPercentage: 33,
    totalStock: 62,
    rating: 4.8,
    reviewCount: 88,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: '2024-03-10'
  },

  // 15. Office / Laptop Bag 3
  {
    id: 'prod-office-02',
    slug: 'strata-slim-expandable-laptop-briefcase',
    name: 'Strata Slim 15.6" Executive Briefcase',
    subtitle: 'Waterproof Ballistic Nylon with expandable 5cm gusset',
    brand: 'VELO & CO.',
    category: 'office-bags',
    subcategory: 'Executive Laptop Bags',
    collections: ['work-essentials', 'best-sellers'],
    badges: ['BESTSELLER'],
    description: 'Precision engineered for boardroom professionals. Expands from a minimalist 8cm slim briefcase to a capacious travel companion in one zip.',
    features: ['Expandable 5cm perimeter zipper gusset', 'Trolley pass-through sleeve', 'RFID protected card slots'],
    specifications: {
      material: 'Ballistic Nylon',
      waterResistance: 'Water Resistant',
      laptopCompatibility: '15.6"',
      capacityCategory: '10-20L',
      compartmentsCount: 4,
      closureType: 'Lockable YKK Zippers',
      handleType: 'Full-Grain Leather Padded Handles',
      strapType: 'Detachable Ergonomic Shoulder Strap',
      warranty: '3-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 31, widthCm: 42, depthCm: 9, weightGrams: 890, volumeLiters: 15 },
    capacityVisualDescription: 'Fits 15.6" laptop, iPad Pro, charging hub, file folders, and notebook.',
    variants: [
      {
        id: 'var-of-2-black',
        colorName: 'Onyx Black & Gunmetal',
        colorHex: '#18181b',
        capacity: '15L',
        sku: 'VLO-BRF-02-BLK',
        price: 2899,
        originalPrice: 4499,
        stock: 30,
        images: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 2899,
    originalPrice: 4499,
    discountPercentage: 35,
    totalStock: 30,
    rating: 4.8,
    reviewCount: 145,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-01-22'
  },

  // 16. Office / Laptop Bag 4
  {
    id: 'prod-laptop-02',
    slug: 'aerotech-minimalist-14-commuter-backpack',
    name: 'AeroTech Ultra-Slim 14" Commuter Pack',
    subtitle: 'Aerodynamic weatherproof shell with magnetic sternum clip',
    brand: 'VELO & CO.',
    category: 'laptop-bags',
    subcategory: 'Executive Laptop Bags',
    collections: ['work-essentials'],
    badges: ['NEW'],
    description: 'The ultimate minimalist metro commuter pack. Stays razor-thin against your back during crowded public transit yet accommodates your full digital setup.',
    features: ['Ultra-slim 11cm profile', 'Hidden magnetic quick-access top flap', 'Velvet-lined laptop cradle'],
    specifications: {
      material: 'Cordura Polyester',
      waterResistance: 'Waterproof',
      laptopCompatibility: '14"',
      capacityCategory: '10-20L',
      compartmentsCount: 3,
      closureType: 'Concealed Weatherproof Zippers',
      handleType: 'Low-Profile Webbing Grip',
      strapType: 'Memory-Foam Contoured Straps',
      warranty: '2-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 42, widthCm: 29, depthCm: 11, weightGrams: 680, volumeLiters: 16 },
    capacityVisualDescription: 'Fits 14" MacBook Pro, tablet, mouse, chargers, slim thermos, and notebook.',
    variants: [
      {
        id: 'var-lp-2-grey',
        colorName: 'Space Grey Heather',
        colorHex: '#475569',
        capacity: '16L',
        sku: 'VLO-LP-02-GRY',
        price: 2499,
        originalPrice: 3999,
        stock: 42,
        images: [
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 2499,
    originalPrice: 3999,
    discountPercentage: 37,
    totalStock: 42,
    rating: 4.9,
    reviewCount: 92,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: '2024-02-28'
  },

  // 17. Office / Laptop Bag 5
  {
    id: 'prod-office-03',
    slug: 'verona-handcrafted-leather-messenger-bag',
    name: 'Verona Tuscan Leather Postal Messenger',
    subtitle: 'Full-Grain vegetable tanned leather with solid brass buckle hardware',
    brand: 'VELO & CO. ATELIER',
    category: 'office-bags',
    subcategory: 'Leather Briefcases',
    collections: ['work-essentials', 'premium-selection'],
    badges: ['LIMITED'],
    description: 'Echoing mid-century dispatch satchels, cut from oily Tuscan hide that deepens in character year after year.',
    features: ['Solid cast brass roller buckles', 'Cushioned 15" tablet/laptop partition', 'Hidden magnetic quick-release clasps under faux buckles'],
    specifications: {
      material: 'Full-Grain Leather',
      waterResistance: 'Weather-Resistant',
      laptopCompatibility: '15.6"',
      capacityCategory: '10-20L',
      compartmentsCount: 3,
      closureType: 'Flapover Magnetic Quick-Snap',
      handleType: 'Riveted Top Leather Handle',
      strapType: 'Heavy Canvas & Leather Shoulder Strap',
      warranty: '5-Year Atelier Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 32, widthCm: 39, depthCm: 10, weightGrams: 1220, volumeLiters: 14 },
    capacityVisualDescription: 'Fits 15" laptop, A4 documents, journal, fountain pens, and charging brick.',
    variants: [
      {
        id: 'var-of-3-tobacco',
        colorName: 'Vintage Tobacco Brown',
        colorHex: '#78350f',
        capacity: '14L',
        sku: 'VLO-MSG-03-TOB',
        price: 5499,
        originalPrice: 8499,
        stock: 12,
        images: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 5499,
    originalPrice: 8499,
    discountPercentage: 35,
    totalStock: 12,
    rating: 5.0,
    reviewCount: 48,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    createdAt: '2024-01-30'
  },

  // 18. Office / Laptop Bag 6
  {
    id: 'prod-laptop-03',
    slug: 'vanguard-executive-tsa-17-inch-backpack',
    name: 'Vanguard 17" TSA Giant Tech Pack',
    subtitle: 'Heavy-duty developer backpack with dual padded laptop cradles',
    brand: 'VELO & CO.',
    category: 'laptop-bags',
    subcategory: 'Executive Laptop Bags',
    collections: ['work-essentials', 'best-sellers'],
    badges: ['BESTSELLER'],
    description: 'Engineered for mobile software engineers, architects, and creators carrying large 16"–17" workstation rigs and dual screens.',
    features: ['Fits up to 17.3" gaming / creator laptops', 'Dedicated secondary iPad sleeve', 'External USB-C 65W fast-charging pass-through'],
    specifications: {
      material: 'Ballistic Nylon',
      waterResistance: 'Water Resistant',
      laptopCompatibility: '17"',
      capacityCategory: '30-40L',
      compartmentsCount: 5,
      closureType: 'Double-Layer Lockable YKK Zippers',
      handleType: 'Steel Wire Reinforced Heavy Handle',
      strapType: 'Triple-Density Orthopedic Shoulder Harness',
      warranty: 'Lifetime Limited Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 50, widthCm: 35, depthCm: 21, weightGrams: 1280, volumeLiters: 34 },
    capacityVisualDescription: 'Fits 17" laptop, secondary 13" iPad, full-size keyboard, over-ear headphones, mouse, and 2 changes of clothes.',
    variants: [
      {
        id: 'var-lp-3-matte',
        colorName: 'Matte Stealth Black',
        colorHex: '#09090b',
        capacity: '34L',
        sku: 'VLO-LP-03-BLK',
        price: 4299,
        originalPrice: 6999,
        stock: 25,
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 4299,
    originalPrice: 6999,
    discountPercentage: 38,
    totalStock: 25,
    rating: 4.9,
    reviewCount: 204,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-01-12'
  },

  // 19. Office / Laptop Bag 7
  {
    id: 'prod-office-04',
    slug: 'oxford-structured-business-attache-briefcase',
    name: 'Oxford Professional Hard-Shell Briefcase',
    subtitle: 'Aluminum-reinforced perimeter with dual combination lock',
    brand: 'VELO & CO.',
    category: 'office-bags',
    subcategory: 'Leather Briefcases',
    collections: ['work-essentials'],
    badges: ['NEW'],
    description: 'An authoritative hard-form briefcase providing impenetrable protection for confidential contracts and precision electronics.',
    features: ['Aluminum reinforced internal frame', 'Dual 3-digit combination locks', 'Self-standing accordion document organizers'],
    specifications: {
      material: 'Vegan PU',
      waterResistance: 'Waterproof',
      laptopCompatibility: '15.6"',
      capacityCategory: '10-20L',
      compartmentsCount: 4,
      closureType: 'Dual Combination Push-Locks',
      handleType: 'Anatomical Molded Handle',
      strapType: 'Removable Shoulder Strap',
      warranty: '3-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 33, widthCm: 44, depthCm: 10, weightGrams: 1450, volumeLiters: 16 },
    capacityVisualDescription: 'Fits 15.6" laptop, hard dossiers, legal files, tablet, passport, and pens.',
    variants: [
      {
        id: 'var-of-4-burgundy',
        colorName: 'Royal Burgundy Claret',
        colorHex: '#4c0519',
        capacity: '16L',
        sku: 'VLO-BRF-04-BUR',
        price: 3699,
        originalPrice: 5999,
        stock: 18,
        images: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 3699,
    originalPrice: 5999,
    discountPercentage: 38,
    totalStock: 18,
    rating: 4.8,
    reviewCount: 52,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: '2024-03-02'
  },

  // 20. Travel Bag 3
  {
    id: 'prod-travel-02',
    slug: 'nomad-expedition-55l-adventure-travel-pack',
    name: 'Nomad Expedition 55L All-Terrain Backpack',
    subtitle: 'Internal aluminum frame with detachable 15L daypack',
    brand: 'VELO & CO. TRAVEL',
    category: 'travel-bags',
    subcategory: 'Travel Backpacks',
    collections: ['pack-more'],
    badges: ['BESTSELLER'],
    description: 'Built for transcontinental backpacking and rugged trail traversal. Modular zip-off daypack gives you 2 bags in 1.',
    features: ['Detachable 15L companion daypack', 'Full stowable harness cover for airline checked baggage', 'Hydration bladder port'],
    specifications: {
      material: 'Cordura Polyester',
      waterResistance: 'Waterproof',
      laptopCompatibility: '15.6"',
      capacityCategory: '40L+',
      compartmentsCount: 6,
      closureType: 'Heavy YKK Double Zippers with Storm Flaps',
      handleType: 'Dual Heavy Haul Handles',
      strapType: 'Load-Distributing Padded Hip Belt & Harness',
      warranty: '5-Year Expedition Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 65, widthCm: 36, depthCm: 28, weightGrams: 1750, volumeLiters: 55 },
    capacityVisualDescription: 'Fits 10+ days of clothing, hiking boots, sleeping bag, toiletry kit, and 15.6" laptop.',
    variants: [
      {
        id: 'var-tr-2-sage',
        colorName: 'Tactical Sage Green',
        colorHex: '#365314',
        capacity: '55L',
        sku: 'VLO-EXP-02-SAG',
        price: 4999,
        originalPrice: 7999,
        stock: 19,
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 4999,
    originalPrice: 7999,
    discountPercentage: 37,
    totalStock: 19,
    rating: 4.9,
    reviewCount: 138,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-01-28'
  },

  // 21. Travel Bag 4 (Duffle)
  {
    id: 'prod-duffle-02',
    slug: 'heritage-leather-canvas-weekender-holdall',
    name: 'Heritage Canvas & Saddle Leather Holdall',
    subtitle: 'Heavy 18oz waxed canvas with vegetable-tanned bridle leather trims',
    brand: 'VELO & CO. ATELIER',
    category: 'duffle-bags',
    subcategory: 'Weekender Duffles',
    collections: ['pack-more', 'premium-selection'],
    badges: ['LIMITED'],
    description: 'The epitome of classic English motoring luggage. Solid brass hardware, storm-proof waxed canvas, and interior houndstooth lining.',
    features: ['18oz storm-proof waxed cotton canvas', 'Solid brass base studs', 'Interior zippered valuables pouch'],
    specifications: {
      material: 'Waterproof Canvas',
      waterResistance: 'Water Resistant',
      laptopCompatibility: '14"',
      capacityCategory: '30-40L',
      compartmentsCount: 3,
      closureType: 'Solid Brass Two-Way Zippers',
      handleType: 'Rolled Bridle Leather Handles',
      strapType: 'Heavy Webbing & Leather Shoulder Strap',
      warranty: '5-Year Atelier Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 30, widthCm: 52, depthCm: 25, weightGrams: 1350, volumeLiters: 38 },
    capacityVisualDescription: 'Fits 3-4 days of tailored clothes, extra shoes, dopp kit, and books.',
    variants: [
      {
        id: 'var-df-2-tan',
        colorName: 'Khaki Sand & Saddle Tan',
        colorHex: '#78350f',
        capacity: '38L',
        sku: 'VLO-DUF-02-KHA',
        price: 3999,
        originalPrice: 6499,
        stock: 22,
        images: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 3999,
    originalPrice: 6499,
    discountPercentage: 38,
    totalStock: 22,
    rating: 5.0,
    reviewCount: 67,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    createdAt: '2024-02-10'
  },

  // 22. Travel Bag 5 (Trolley)
  {
    id: 'prod-trolley-02',
    slug: 'aerolite-aluminum-check-in-medium-suitcase',
    name: 'AeroLite Solid Aluminum 68L Medium Spinner',
    subtitle: 'Zipperless aluminum magnesium shell with dual butterfly TSA latches',
    brand: 'VELO & CO. TRAVEL',
    category: 'trolley-bags',
    subcategory: 'Hard Shell Spinners',
    collections: ['pack-more', 'premium-selection'],
    badges: ['NEW'],
    description: 'Engineered without zippers for impenetrable security. Double-gasket rubber seals keep dust and water completely locked out.',
    features: ['Full aircraft-grade aluminum alloy body', 'Zipperless dual TSA combination locks', '360° whisper dual ball-bearing wheels'],
    specifications: {
      material: 'Recycled Eco-Fabric',
      waterResistance: 'Waterproof',
      laptopCompatibility: 'None',
      capacityCategory: '40L+',
      compartmentsCount: 4,
      closureType: 'Zipperless Dual TSA Click-Latches',
      handleType: 'Slow-Retracting Spring Handles',
      strapType: 'Dual Divider Compression Boards',
      warranty: '10-Year Airline Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 68, widthCm: 45, depthCm: 26, weightGrams: 4200, volumeLiters: 68 },
    capacityVisualDescription: 'Fits 10-14 days of wardrobe, 3 pairs of shoes, winter jackets, and accessories.',
    variants: [
      {
        id: 'var-tr-2-silver',
        colorName: 'Raw Brushed Silver',
        colorHex: '#cbd5e1',
        capacity: '68L',
        sku: 'VLO-TRL-02-SLV',
        price: 8999,
        originalPrice: 13999,
        stock: 14,
        images: [
          'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 8999,
    originalPrice: 13999,
    discountPercentage: 36,
    totalStock: 14,
    rating: 4.9,
    reviewCount: 42,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: '2024-03-01'
  },

  // 23. Travel Bag 6 (Duffle)
  {
    id: 'prod-duffle-03',
    slug: 'aerogym-waterproof-sports-duffle',
    name: 'AeroGym Waterproof Active Duffel',
    subtitle: 'Dedicated wet/dry locker pouch with side shoe ventilation',
    brand: 'VELO & CO.',
    category: 'duffle-bags',
    subcategory: 'Weekender Duffles',
    collections: ['pack-more'],
    badges: ['BESTSELLER'],
    description: 'Designed for daily crossfit, swimming, and overnight hotel stays. Fully waterproof TPU-lined dirty clothes compartment prevents odor transfer.',
    features: ['TPU sealed wet gear pouch', 'Odor-venting side shoe tunnel', 'Padded ergonomic shoulder pad'],
    specifications: {
      material: 'Cordura Polyester',
      waterResistance: 'Waterproof',
      laptopCompatibility: '14"',
      capacityCategory: '30-40L',
      compartmentsCount: 5,
      closureType: 'Aquaguard Waterproof Zips',
      handleType: 'Velcro Padded Webbing Handle',
      strapType: 'Adjustable Air-Mesh Sling Strap',
      warranty: '2-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 26, widthCm: 50, depthCm: 24, weightGrams: 780, volumeLiters: 32 },
    capacityVisualDescription: 'Fits gym clothes, sneakers, protein shaker, towel, toiletries, and tablet.',
    variants: [
      {
        id: 'var-df-3-black',
        colorName: 'Matte Jet Black',
        colorHex: '#18181b',
        capacity: '32L',
        sku: 'VLO-DUF-03-BLK',
        price: 2199,
        originalPrice: 3499,
        stock: 45,
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 2199,
    originalPrice: 3499,
    discountPercentage: 37,
    totalStock: 45,
    rating: 4.8,
    reviewCount: 156,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-01-19'
  },

  // 24. Travel Bag 7 (Trolley)
  {
    id: 'prod-trolley-03',
    slug: 'horizon-front-pocket-laptop-cabin-trolley',
    name: 'Horizon Quick-Access Front Pocket Cabin Trolley',
    subtitle: 'Dedicated pop-out front laptop lid for TSA security checkpoints',
    brand: 'VELO & CO. TRAVEL',
    category: 'trolley-bags',
    subcategory: 'Hard Shell Spinners',
    collections: ['pack-more', 'best-sellers'],
    badges: ['BESTSELLER'],
    description: 'Never unzip your whole suitcase at airport security again. The front shell pops forward on hydraulic hinges to dispense your laptop and tablet instantly.',
    features: ['Quick-release front laptop pocket', 'USB charging port near handle', 'Whisper-quiet dual Hinomoto wheels'],
    specifications: {
      material: 'Recycled Eco-Fabric',
      waterResistance: 'Waterproof',
      laptopCompatibility: '15.6"',
      capacityCategory: '30-40L',
      compartmentsCount: 4,
      closureType: 'TSA Integrated Zippers',
      handleType: 'Cushioned Telescopic Handle',
      strapType: 'Compression Tie-Down Straps',
      warranty: '5-Year International Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 54, widthCm: 36, depthCm: 24, weightGrams: 3100, volumeLiters: 40 },
    capacityVisualDescription: 'Strict cabin compliant. Fits 15.6" laptop, tablet, 5-7 days of outfits, and toiletries.',
    variants: [
      {
        id: 'var-tr-3-green',
        colorName: 'Emerald Deep Green',
        colorHex: '#064e3b',
        capacity: '40L',
        sku: 'VLO-TRL-03-GRN',
        price: 6499,
        originalPrice: 9999,
        stock: 20,
        images: [
          'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 6499,
    originalPrice: 9999,
    discountPercentage: 35,
    totalStock: 20,
    rating: 4.9,
    reviewCount: 110,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-02-05'
  },

  // 25. Handbag / Sling 3
  {
    id: 'prod-handbag-02',
    slug: 'serena-pleated-crossbody-clutch-bag',
    name: 'Serena Pleated Vegan Leather Crossbody',
    subtitle: 'Fluted cloud silhouette with convertible brass chain strap',
    brand: 'VELO & CO. LUXE',
    category: 'handbags',
    subcategory: 'Structured Totes',
    collections: ['women-collection'],
    badges: ['NEW'],
    description: 'A cloud-like sculptural clutch crafted from micro-pleated vegan leather. Converts instantly from daytime crossbody to red-carpet clutch.',
    features: ['Detachable gold-tone link chain', 'Concealed magnetic snap frame', 'Interior suede card organizer'],
    specifications: {
      material: 'Vegan PU',
      waterResistance: 'Water Resistant',
      laptopCompatibility: 'None',
      capacityCategory: 'Under 10L',
      compartmentsCount: 2,
      closureType: 'Magnetic Clasp Frame',
      handleType: 'Clutch Grip',
      strapType: 'Detachable Gold Chain Strap',
      warranty: '1-Year Luxe Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 18, widthCm: 28, depthCm: 10, weightGrams: 390, volumeLiters: 4 },
    capacityVisualDescription: 'Fits phone, compact mirror, lipsticks, cardholder, and keys.',
    variants: [
      {
        id: 'var-hb-2-blush',
        colorName: 'Blush Pearl Rose',
        colorHex: '#fecdd3',
        capacity: '4L',
        sku: 'VLO-CLU-02-ROSE',
        price: 1999,
        originalPrice: 3299,
        stock: 38,
        images: [
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 1999,
    originalPrice: 3299,
    discountPercentage: 39,
    totalStock: 38,
    rating: 4.8,
    reviewCount: 65,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: '2024-03-08'
  },

  // 26. Handbag / Sling 4
  {
    id: 'prod-sling-02',
    slug: 'kinesis-tactical-commuter-chest-sling',
    name: 'Kinesis Urban Tactical Crossbody Sling',
    subtitle: 'Fidlock quick-release strap with hidden phone holster',
    brand: 'VELO & CO.',
    category: 'sling-bags',
    subcategory: 'Crossbody Bags',
    collections: ['travel-light', 'best-sellers'],
    badges: ['BESTSELLER'],
    description: 'Engineered for cyclists and rapid city transit. Sits securely against upper chest preventing bounce during sprinting or cycling.',
    features: ['German Fidlock magnetic buckle', 'Ambidextrous 360° strap swivel', 'Waterproof Aquaguard zips'],
    specifications: {
      material: 'Cordura Polyester',
      waterResistance: 'Waterproof',
      laptopCompatibility: '11"',
      capacityCategory: 'Under 10L',
      compartmentsCount: 3,
      closureType: 'Aquaguard Zippers',
      handleType: 'Top Webbing Loop',
      strapType: 'Padded Reversible Sling Harness',
      warranty: '2-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 20, widthCm: 32, depthCm: 8, weightGrams: 340, volumeLiters: 5 },
    capacityVisualDescription: 'Fits iPad mini, smartphone, passport, earbuds, wallet, and sunglasses.',
    variants: [
      {
        id: 'var-sl-2-camo',
        colorName: 'Shadow Camo Black',
        colorHex: '#27272a',
        capacity: '5L',
        sku: 'VLO-SLG-02-CAM',
        price: 1849,
        originalPrice: 2899,
        stock: 44,
        images: [
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 1849,
    originalPrice: 2899,
    discountPercentage: 36,
    totalStock: 44,
    rating: 4.8,
    reviewCount: 140,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-01-26'
  },

  // 27. Handbag / Sling 5
  {
    id: 'prod-handbag-03',
    slug: 'aurora-saddle-crossbody-shoulder-bag',
    name: 'Aurora Sculpted Saddle Shoulder Bag',
    subtitle: 'Classic equestrian curve with magnetic flap closure',
    brand: 'VELO & CO. LUXE',
    category: 'handbags',
    subcategory: 'Structured Totes',
    collections: ['women-collection', 'best-sellers'],
    badges: ['BESTSELLER'],
    description: 'Equestrian grace reimagined for metropolitan streets. Smooth semi-gloss vegan leather with contrasting ivory saddle-stitching.',
    features: ['Equestrian curved silhouette', 'Adjustable leather shoulder strap', 'Rear quick-slip phone pocket'],
    specifications: {
      material: 'Vegan PU',
      waterResistance: 'Water Resistant',
      laptopCompatibility: 'None',
      capacityCategory: 'Under 10L',
      compartmentsCount: 2,
      closureType: 'Magnetic Flapover Clasp',
      handleType: 'Shoulder Drop Strap',
      strapType: 'Adjustable Belt-Buckle Strap',
      warranty: '1-Year Luxe Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 22, widthCm: 26, depthCm: 8, weightGrams: 460, volumeLiters: 5 },
    capacityVisualDescription: 'Fits smartphone, card wallet, compact perfume, lipstick, and sunglasses.',
    variants: [
      {
        id: 'var-hb-3-caramel',
        colorName: 'Warm Caramel Tan',
        colorHex: '#b45309',
        capacity: '5L',
        sku: 'VLO-SAD-03-CAR',
        price: 2399,
        originalPrice: 3899,
        stock: 31,
        images: [
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 2399,
    originalPrice: 3899,
    discountPercentage: 38,
    totalStock: 31,
    rating: 4.9,
    reviewCount: 115,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-02-08'
  },

  // 28. Handbag / Sling 6
  {
    id: 'prod-sling-03',
    slug: 'aerolite-crossbody-messenger-mini',
    name: 'AeroLite Minimalist Mini Crossbody',
    subtitle: 'Ultralight waterproof ripstop with dual zip compartments',
    brand: 'VELO & CO.',
    category: 'sling-bags',
    subcategory: 'Crossbody Bags',
    collections: ['travel-light'],
    badges: ['NEW'],
    description: 'Weighs just 210 grams. Perfect everyday companion for festivals, morning walks, and airport boarding passes.',
    features: ['Featherlight 210g weight', 'Dual compartment organization', 'Key clip & cable port'],
    specifications: {
      material: 'Cordura Polyester',
      waterResistance: 'Waterproof',
      laptopCompatibility: 'None',
      capacityCategory: 'Under 10L',
      compartmentsCount: 2,
      closureType: 'Water-Sealed Zippers',
      handleType: 'None',
      strapType: 'Narrow Climbing Rope Cord Strap',
      warranty: '2-Year Guarantee',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 16, widthCm: 22, depthCm: 6, weightGrams: 210, volumeLiters: 2.5 },
    capacityVisualDescription: 'Fits passport, boarding passes, phone, keys, and sanitiser.',
    variants: [
      {
        id: 'var-sl-3-navy',
        colorName: 'Nautical Navy',
        colorHex: '#1e3a8a',
        capacity: '2.5L',
        sku: 'VLO-SLG-03-NVY',
        price: 1199,
        originalPrice: 1899,
        stock: 50,
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 1199,
    originalPrice: 1899,
    discountPercentage: 36,
    totalStock: 50,
    rating: 4.7,
    reviewCount: 82,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: '2024-03-12'
  },

  // 29. Handbag / Sling 7
  {
    id: 'prod-handbag-04',
    slug: 'paloma-quilted-convertible-shoulder-bag',
    name: 'Paloma Diamond Quilted Flap Bag',
    subtitle: 'Geometric diamond stitching with dual-wear slide chain',
    brand: 'VELO & CO. LUXE',
    category: 'handbags',
    subcategory: 'Structured Totes',
    collections: ['women-collection'],
    badges: ['BESTSELLER'],
    description: 'Signature chevron quilted pattern handcrafted in smooth vegan leather with an ingenious dual-slide chain that shifts from long crossbody to double-shoulder drop.',
    features: ['Diamond quilted padding', 'Dual-slide polished gold chain', 'Burgundy microfiber lining'],
    specifications: {
      material: 'Vegan PU',
      waterResistance: 'Water Resistant',
      laptopCompatibility: 'None',
      capacityCategory: 'Under 10L',
      compartmentsCount: 3,
      closureType: 'Turn-lock Gold Clasp',
      handleType: 'Sliding Shoulder Chain',
      strapType: 'Gold Chain with Leather Shoulder Guard',
      warranty: '1-Year Luxe Warranty',
      countryOfOrigin: 'India'
    },
    dimensions: { heightCm: 17, widthCm: 25, depthCm: 9, weightGrams: 520, volumeLiters: 4.5 },
    capacityVisualDescription: 'Fits phone, compact wallet, sunglasses, keys, and makeup essentials.',
    variants: [
      {
        id: 'var-hb-4-black',
        colorName: 'Quilted Midnight Black',
        colorHex: '#0f172a',
        capacity: '4.5L',
        sku: 'VLO-QTB-04-BLK',
        price: 2599,
        originalPrice: 4199,
        stock: 34,
        images: [
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ],
    currentPrice: 2599,
    originalPrice: 4199,
    discountPercentage: 38,
    totalStock: 34,
    rating: 4.9,
    reviewCount: 128,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2024-02-12'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'VELOFIRST',
    description: 'Flat ₹300 OFF on your first purchase above ₹1499',
    discountType: 'FLAT',
    discountValue: 300,
    minOrderAmount: 1499,
    validUntil: '2026-12-31',
    isActive: true,
    usageCount: 412
  },
  {
    id: 'coup-2',
    code: 'TRAVEL20',
    description: '20% OFF on all Travel & Duffle Bags up to ₹800',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    minOrderAmount: 2499,
    maxDiscount: 800,
    validUntil: '2026-11-30',
    applicableCategory: 'travel-bags',
    isActive: true,
    usageCount: 184
  },
  {
    id: 'coup-3',
    code: 'FREESHIP',
    description: 'Free expedited delivery on any order above ₹999',
    discountType: 'FLAT',
    discountValue: 150,
    minOrderAmount: 999,
    validUntil: '2026-12-31',
    isActive: true,
    usageCount: 650
  }
];

export const INITIAL_BANNERS: BannerSlide[] = [
  {
    id: 'ban-1',
    title: 'CARRY YOUR WORLD.',
    subtitle: 'ENGINEERED FOR SCHOOL, WORK, TRAVEL & EVERYTHING IN BETWEEN',
    tagline: 'AUTUMN / WINTER 2026 COLLECTION',
    ctaText: 'EXPLORE BACKPACKS',
    ctaLink: '/category/backpacks',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1800&auto=format&fit=crop',
    categoryTag: 'Backpacks',
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'ban-2',
    title: 'READY FOR EVERY SCHOOL DAY.',
    subtitle: 'ORTHOPEDIC SPINE PROTECTION & WATERPROOF DURABILITY FOR STUDENTS',
    tagline: 'BACK TO SCHOOL 2026',
    ctaText: 'SHOP SCHOOL BAGS',
    ctaLink: '/category/school-bags',
    imageUrl: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1800&auto=format&fit=crop',
    categoryTag: 'School Bags',
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'ban-3',
    title: 'WORK. ORGANIZED.',
    subtitle: 'PRECISION TECH BACKPACKS & FULL-GRAIN LEATHER BRIEFCASES',
    tagline: 'EXECUTIVE SERIES',
    ctaText: 'SHOP OFFICE COLLECTION',
    ctaLink: '/category/office-bags',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1800&auto=format&fit=crop',
    categoryTag: 'Office Bags',
    sortOrder: 3,
    isActive: true
  }
];

export const INITIAL_ADMIN_USER: AdminUser = {
  id: 'admin-01',
  name: 'Ashish Ojha (Director)',
  email: 'admin@velobags.com',
  role: 'SUPER_ADMIN',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  lastLogin: 'Today, 11:30 AM',
  isActive: true
};

export const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'VLO-88219',
    userId: 'cust-01',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@example.com',
    customerPhone: '+91 98765 43210',
    items: [
      {
        productId: 'prod-school-01',
        variantId: 'var-sc-1-navy',
        name: 'Apex Orthopedic Pro School Backpack',
        colorName: 'Midnight Navy & Electric Orange',
        image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=300&auto=format&fit=crop',
        price: 1899,
        quantity: 1
      }
    ],
    shippingAddress: {
      id: 'addr-01',
      fullName: 'Rahul Sharma',
      phone: '+91 98765 43210',
      addressLine1: 'B-402, Prestige Tower, Indiranagar',
      addressLine2: 'Near Metro Station',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      addressType: 'Home',
      isDefault: true
    },
    paymentMethod: 'UPI',
    paymentStatus: 'PAID',
    deliveryMethod: 'STANDARD',
    subtotal: 1899,
    discount: 0,
    shippingCharge: 0,
    tax: 95,
    totalAmount: 1899,
    status: 'SHIPPED',
    courierName: 'BlueDart Express',
    trackingNumber: 'BD-998821034',
    estimatedDelivery: 'Tomorrow, by 6:00 PM',
    placedAt: '2026-09-21T10:15:00.000Z',
    timeline: [
      {
        status: 'PLACED',
        title: 'Order Placed & Verified',
        description: 'Payment of ₹1,899 received successfully via Google Pay UPI.',
        timestamp: '2026-09-21 10:15 AM',
        location: 'Bengaluru Fulfillment Center'
      },
      {
        status: 'CONFIRMED',
        title: 'Order Confirmed',
        description: 'Inventory allocated and dispatched to pick-pack bay.',
        timestamp: '2026-09-21 11:30 AM',
        location: 'Warehouse Hub 1'
      },
      {
        status: 'PACKED',
        title: 'Quality Checked & Packed',
        description: 'Passed 12-point quality check and bagged with protective dust cover.',
        timestamp: '2026-09-22 09:00 AM',
        location: 'Warehouse Hub 1'
      },
      {
        status: 'SHIPPED',
        title: 'Dispatched with Courier',
        description: 'Handed over to BlueDart. Tracking ID: BD-998821034.',
        timestamp: '2026-09-22 04:30 PM',
        location: 'In Transit to Regional Sorting Hub'
      }
    ]
  }
];

