import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useToastStore } from '../../store/useToastStore';
import { useAdminStore } from '../../store/useAdminStore';
import { Product, BagCategory, BagMaterial, LaptopSize, BagCapacity } from '../../types';
import './AdminAddProductPage.scss';

export const AdminAddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const addProduct = useProductStore((s) => s.addProduct);
  const addToast = useToastStore((s) => s.addToast);
  const addAuditLog = useAdminStore((s) => s.addAuditLog);

  // Form State
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [brand, setBrand] = useState('VELO & CO.');
  const [category, setCategory] = useState<BagCategory>('backpacks');
  const [subcategory, setSubcategory] = useState('Executive Laptop Packs');
  const [currentPrice, setCurrentPrice] = useState<number>(2499);
  const [originalPrice, setOriginalPrice] = useState<number>(3999);
  const [description, setDescription] = useState('');
  const [capacityLiters, setCapacityLiters] = useState<number>(24);
  const [capacityCategory, setCapacityCategory] = useState<BagCapacity>('20-30L');
  const [laptopSize, setLaptopSize] = useState<LaptopSize>('15.6"');
  const [material, setMaterial] = useState<BagMaterial>('Ballistic Nylon');
  const [waterResistance, setWaterResistance] = useState<'Water Resistant' | 'Waterproof' | 'Weather-Resistant' | 'None'>('Water Resistant');
  
  // Dimensions
  const [heightCm, setHeightCm] = useState<number>(45);
  const [widthCm, setWidthCm] = useState<number>(30);
  const [depthCm, setDepthCm] = useState<number>(16);
  const [weightGrams, setWeightGrams] = useState<number>(750);
  const [capacityDescription, setCapacityDescription] = useState('Fits 15.6" laptop, tech charger, documents, and 750ml water bottle.');

  // Variants
  const [variants, setVariants] = useState([
    {
      id: 'var-new-1',
      colorName: 'Stealth Black',
      colorHex: '#18181b',
      capacity: '24L',
      sku: 'VLO-NEW-01-BLK',
      price: 2499,
      originalPrice: 3999,
      stock: 50,
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop'
      ]
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const discountPct = originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

    const newProduct: Product = {
      id: 'prod-' + Date.now(),
      slug: slug || 'bag-' + Date.now(),
      name,
      subtitle,
      brand,
      category,
      subcategory,
      collections: ['new-arrivals'],
      badges: ['NEW'],
      description,
      features: [
        'Ergonomic airflow back panel',
        'Reinforced high-tensile bartack stitching',
        'TSA lock-compatible zipper sliders'
      ],
      specifications: {
        material,
        waterResistance,
        laptopCompatibility: laptopSize,
        capacityCategory,
        compartmentsCount: 3,
        closureType: 'Heavy YKK Dual Zippers',
        handleType: 'Cushioned Top Handle',
        strapType: 'S-Curve Ergonomic Straps',
        warranty: '2-Year Craftsmanship Warranty',
        countryOfOrigin: 'India'
      },
      dimensions: {
        heightCm,
        widthCm,
        depthCm,
        weightGrams,
        volumeLiters: capacityLiters
      },
      capacityVisualDescription: capacityDescription,
      variants,
      currentPrice,
      originalPrice,
      discountPercentage: discountPct,
      totalStock: variants.reduce((sum, v) => sum + v.stock, 0),
      rating: 5.0,
      reviewCount: 1,
      isFeatured: true,
      createdAt: new Date().toISOString()
    };

    addProduct(newProduct);

    addAuditLog({
      adminName: 'Ashish Ojha',
      adminEmail: 'admin@velobags.com',
      action: 'CREATE_PRODUCT',
      targetEntity: 'Product Catalog',
      details: `Created new bag model: ${name} (SKU: ${variants[0].sku})`,
      ipAddress: '127.0.0.1'
    });

    addToast({
      type: 'success',
      title: 'Bag Created & Published',
      description: `${name} is live on customer storefront.`
    });

    navigate('/admin/products');
  };

  return (
    <div className="admin-add-product-page">
      <div className="page-head-row">
        <button onClick={() => navigate('/admin/products')} className="btn-back">
          <ArrowLeft size={16} /> Back to Catalog
        </button>
        <h1 className="page-title">Publish New Bag Model</h1>
      </div>

      <form onSubmit={handleSubmit} className="product-form-card">
        {/* Basic Metadata */}
        <div className="form-section">
          <h3 className="section-title">1. Essential Product Classification</h3>
          <div className="fields-grid">
            <div className="form-group span-2">
              <label>Bag Model Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Apex 28L Orthopedic Pro School Backpack"
                required
              />
            </div>

            <div className="form-group span-2">
              <label>Editorial Subtitle / Tagline *</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Triple-cushioned spine support with reflective safety piping"
                required
              />
            </div>

            <div className="form-group">
              <label>Brand Division</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Master Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BagCategory)}
              >
                <option value="school-bags">School Bags</option>
                <option value="backpacks">Backpacks</option>
                <option value="laptop-bags">Laptop Bags</option>
                <option value="office-bags">Office Bags</option>
                <option value="handbags">Handbags</option>
                <option value="sling-bags">Sling Bags</option>
                <option value="travel-bags">Travel Bags</option>
                <option value="duffle-bags">Duffle Bags</option>
                <option value="trolley-bags">Trolley Bags</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="form-section">
          <h3 className="section-title">2. Commercial Pricing</h3>
          <div className="fields-grid">
            <div className="form-group">
              <label>Selling Price (₹) *</label>
              <input
                type="number"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label>Original MRP (₹) *</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                required
              />
            </div>
          </div>
        </div>

        {/* Bag Specialized Engineering Specifications */}
        <div className="form-section">
          <h3 className="section-title">3. Bag Engineering &amp; Spatial Specifications</h3>
          <div className="fields-grid">
            <div className="form-group">
              <label>Volume Capacity (Liters)</label>
              <input
                type="number"
                value={capacityLiters}
                onChange={(e) => setCapacityLiters(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Capacity Tier</label>
              <select
                value={capacityCategory}
                onChange={(e) => setCapacityCategory(e.target.value as BagCapacity)}
              >
                <option value="Under 10L">Under 10L</option>
                <option value="10-20L">10-20L</option>
                <option value="20-30L">20-30L</option>
                <option value="30-40L">30-40L</option>
                <option value="40L+">40L+</option>
              </select>
            </div>

            <div className="form-group">
              <label>Laptop Partition Size</label>
              <select
                value={laptopSize}
                onChange={(e) => setLaptopSize(e.target.value as LaptopSize)}
              >
                <option value="None">None</option>
                <option value={'11"'}>11 Inch</option>
                <option value={'13"'}>13 Inch</option>
                <option value={'14"'}>14 Inch</option>
                <option value={'15.6"'}>15.6 Inch</option>
                <option value={'16"'}>16 Inch</option>
                <option value={'17"'}>17 Inch</option>
              </select>
            </div>

            <div className="form-group">
              <label>Primary Textile / Leather</label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value as BagMaterial)}
              >
                <option value="Cordura Polyester">Cordura Polyester</option>
                <option value="Ballistic Nylon">Ballistic Nylon</option>
                <option value="Full-Grain Leather">Full-Grain Leather</option>
                <option value="Vegan PU">Vegan PU</option>
                <option value="Recycled Eco-Fabric">Recycled Eco-Fabric</option>
              </select>
            </div>

            <div className="form-group">
              <label>Waterproofing Standard</label>
              <select
                value={waterResistance}
                onChange={(e) => setWaterResistance(e.target.value as any)}
              >
                <option value="Water Resistant">Water Resistant</option>
                <option value="Waterproof">Waterproof</option>
                <option value="Weather-Resistant">Weather-Resistant</option>
                <option value="None">None</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tare Weight (Grams)</label>
              <input
                type="number"
                value={weightGrams}
                onChange={(e) => setWeightGrams(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="form-section">
          <h3 className="section-title">4. Editorial Description</h3>
          <div className="form-group">
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the load suspension, internal organization, and lifestyle purpose..."
              required
            />
          </div>
        </div>

        <div className="form-submit-row">
          <button type="submit" className="btn-save-product">
            Publish Bag to Storefront Catalog
          </button>
        </div>
      </form>
    </div>
  );
};
