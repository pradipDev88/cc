import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useToastStore } from '../../store/useToastStore';
import { useAdminStore } from '../../store/useAdminStore';
import './AdminProductsPage.scss';

export const AdminProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const products = useProductStore((s) => s.products);
  const deleteProduct = useProductStore((s) => s.deleteProduct);
  const addToast = useToastStore((s) => s.addToast);
  const addAuditLog = useAdminStore((s) => s.addAuditLog);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.variants.some((v) => v.sku.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you certain you wish to archive or purge "${name}" from master inventory?`)) {
      deleteProduct(id);
      addAuditLog({
        adminName: 'Ashish Ojha',
        adminEmail: 'admin@velobags.com',
        action: 'DELETE_PRODUCT',
        targetEntity: 'Product Catalog',
        details: `Purged bag SKU from catalog: ${name}`,
        ipAddress: '127.0.0.1'
      });
      addToast({
        type: 'info',
        title: 'Product Archived',
        description: `${name} has been removed from public catalog.`
      });
    }
  };

  return (
    <div className="admin-products-page">
      <div className="page-head-row">
        <div>
          <span className="pre-label">MERCHANDISING MATRIX</span>
          <h1 className="page-title">Bag Catalog Management ({products.length})</h1>
        </div>

        <button onClick={() => navigate('/admin/products/new')} className="btn-add-primary">
          <Plus size={16} /> Add New Bag Model
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="search-filter-ribbon">
        <div className="search-input-box">
          <Search size={16} className="icon" />
          <input
            type="text"
            placeholder="Search by product name, SKU, or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-select-wrap">
          <Filter size={14} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
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

      {/* Catalog Table */}
      <div className="catalog-table-card">
        <table className="catalog-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Model &amp; SKU</th>
              <th>Category</th>
              <th>Volume / Laptop</th>
              <th>Pricing</th>
              <th>Inventory Status</th>
              <th>Rating</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => {
              const primaryVariant = p.variants[0];
              const isLowStock = p.totalStock < 20;

              return (
                <tr key={p.id}>
                  <td className="cell-thumb">
                    <img src={primaryVariant?.images[0]} alt={p.name} />
                  </td>
                  <td>
                    <div className="cell-product-meta">
                      <span className="p-brand">{p.brand}</span>
                      <strong className="p-name">{p.name}</strong>
                      <span className="p-sku">SKU: {primaryVariant?.sku}</span>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{p.category}</span>
                  </td>
                  <td>
                    <div className="specs-cell">
                      <span>{p.dimensions.volumeLiters} Liters</span>
                      <span className="sub-laptop">Laptop: {p.specifications.laptopCompatibility}</span>
                    </div>
                  </td>
                  <td>
                    <div className="price-cell">
                      <span className="cur-price">₹{p.currentPrice.toLocaleString('en-IN')}</span>
                      {p.originalPrice > p.currentPrice && (
                        <span className="orig-price">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`stock-pill ${isLowStock ? 'low-stock' : 'in-stock'}`}>
                      {isLowStock ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                      {p.totalStock} units
                    </span>
                  </td>
                  <td>
                    <span className="rating-pill">★ {p.rating} ({p.reviewCount})</span>
                  </td>
                  <td className="cell-actions">
                    <button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="btn-action-icon"
                      title="Preview Storefront"
                    >
                      <Search size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="btn-action-icon danger"
                      title="Archive Product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

