import React, { useState } from 'react';
import { Tag, Check, Copy } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';
import './UserCouponsPage.scss';

export const UserCouponsPage: React.FC = () => {
  const coupons = useAdminStore((s) => s.coupons);
  const addToast = useToastStore((s) => s.addToast);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast({
      type: 'success',
      title: 'Voucher Copied to Clipboard',
      description: `Use ${code} during checkout.`
    });
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="user-coupons-page">
      <div className="page-header">
        <h2 className="heading-2">Promotional Vouchers &amp; Perks</h2>
        <p className="lead-text">Active coupon codes linked to your collector profile.</p>
      </div>

      <div className="coupons-grid">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="coupon-ticket-card">
            <div className="ticket-cutout left" />
            <div className="ticket-cutout right" />

            <div className="ticket-head">
              <span className="coupon-badge">
                <Tag size={13} /> {coupon.discountType === 'FLAT' ? `₹${coupon.discountValue} FLAT OFF` : `${coupon.discountValue}% OFF`}
              </span>
              <span className="validity">Valid until {coupon.validUntil}</span>
            </div>

            <h3 className="coupon-code-display">{coupon.code}</h3>
            <p className="coupon-desc">{coupon.description}</p>
            <p className="coupon-min-order">Min Order Total: ₹{coupon.minOrderAmount.toLocaleString('en-IN')}</p>

            <button
              onClick={() => handleCopy(coupon.code)}
              className="btn btn-outline btn-sm copy-btn"
            >
              {copiedCode === coupon.code ? (
                <>
                  <Check size={14} color="#166534" /> Copied!
                </>
              ) : (
                <>
                  <Copy size={14} /> Copy Voucher Code
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

