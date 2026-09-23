import React, { useState } from 'react';
import { Tag, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';
import { Coupon } from '../../types';
import './AdminCouponsPage.scss';

export const AdminCouponsPage: React.FC = () => {
  const coupons = useAdminStore((s) => s.coupons);
  const addCoupon = useAdminStore((s) => s.addCoupon);
  const deleteCoupon = useAdminStore((s) => s.deleteCoupon);
  const addToast = useToastStore((s) => s.addToast);
  const addAuditLog = useAdminStore((s) => s.addAuditLog);

  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'PERCENTAGE' | 'FLAT'>('FLAT');
  const [discountValue, setDiscountValue] = useState<number>(300);
  const [minOrder, setMinOrder] = useState<number>(1499);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoupon: Coupon = {
      id: 'coup-' + Date.now(),
      code: code.trim().toUpperCase(),
      description,
      discountType,
      discountValue,
      minOrderAmount: minOrder,
      validUntil: '2026-12-31',
      isActive: true,
      usageCount: 0
    };

    addCoupon(newCoupon);
    addAuditLog({
      adminName: 'Ashish Ojha',
      adminEmail: 'admin@velobags.com',
      action: 'CREATE_PROMOTION_COUPON',
      targetEntity: `Voucher: ${newCoupon.code}`,
      details: `Created promo voucher for ${discountType === 'FLAT' ? `₹${discountValue} flat` : `${discountValue}%`}`,
      ipAddress: '127.0.0.1'
    });

    addToast({
      type: 'success',
      title: 'Coupon Published',
      description: `${newCoupon.code} is now redeemable.`
    });

    setCode('');
    setDescription('');
  };

  return (
    <div className="admin-coupons-page" style={{ color: '#e5e7eb' }}>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '0.6875rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, color: '#9a6233', display: 'block', marginBottom: '4px' }}>PROMOTIONAL CAMPAIGNS</span>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff' }}>Coupon &amp; Discount Management</h1>
      </div>

      <div className="coupons-layout-grid">
        {/* Creation Form */}
        <form onSubmit={handleCreateCoupon} className="coupon-create-form">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>Create New Promo Voucher</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af' }}>Voucher Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. FLASH500"
              style={{ background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px', color: '#ffffff', textTransform: 'uppercase' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af' }}>Discount Type</label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value as any)}
              style={{ background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px', color: '#ffffff' }}
            >
              <option value="FLAT">Flat Rupee Amount (₹)</option>
              <option value="PERCENTAGE">Percentage (%)</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af' }}>Discount Value</label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(Number(e.target.value))}
              style={{ background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px', color: '#ffffff' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af' }}>Min Order Requirement (₹)</label>
            <input
              type="number"
              value={minOrder}
              onChange={(e) => setMinOrder(Number(e.target.value))}
              style={{ background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px', color: '#ffffff' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af' }}>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Flat ₹500 discount for festive rush"
              style={{ background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px', color: '#ffffff' }}
              required
            />
          </div>

          <button
            type="submit"
            style={{ background: '#9a6233', color: '#ffffff', padding: '12px', borderRadius: '6px', fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: '8px' }}
          >
            Activate Coupon
          </button>
        </form>

        {/* Existing Coupons Table */}
        <div style={{ background: '#15161b', border: '1px solid #242630', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>Active Promotional Vouchers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {coupons.map((c) => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#101115', border: '1px solid #232530', padding: '16px', borderRadius: '6px' }}>
                <div>
                  <strong style={{ color: '#9a6233', fontSize: '1.125rem' }}>{c.code}</strong>
                  <p style={{ fontSize: '0.8125rem', color: '#9ca3af', margin: '4px 0' }}>{c.description}</p>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Min Order: ₹{c.minOrderAmount} • Redemptions: {c.usageCount}</span>
                </div>
                <button
                  onClick={() => deleteCoupon(c.id)}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

