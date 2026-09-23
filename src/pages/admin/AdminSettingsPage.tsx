import React, { useState } from 'react';
import { Sliders, Shield, Save } from 'lucide-react';
import { useToastStore } from '../../store/useToastStore';

export const AdminSettingsPage: React.FC = () => {
  const addToast = useToastStore((s) => s.addToast);
  const [storeName, setStoreName] = useState('VELO & CO. Carry Systems Ltd.');
  const [supportEmail, setSupportEmail] = useState('concierge@velobags.com');
  const [freeShippingLimit, setFreeShippingLimit] = useState(999);
  const [expressRate, setExpressRate] = useState(149);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Settings Saved',
      description: 'System configurations updated across storefront.'
    });
  };

  return (
    <div className="admin-settings-page" style={{ color: '#e5e7eb', maxWidth: '720px' }}>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '0.6875rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, color: '#9a6233', display: 'block', marginBottom: '4px' }}>SYSTEM INFRASTRUCTURE</span>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff' }}>Global Store &amp; Fulfillment Settings</h1>
      </div>

      <form onSubmit={handleSave} style={{ background: '#15161b', border: '1px solid #242630', borderRadius: '8px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af' }}>Legal Brand Entity</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            style={{ background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px', color: '#ffffff' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af' }}>Support Concierge Email</label>
          <input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            style={{ background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px', color: '#ffffff' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af' }}>Free Shipping Threshold (₹)</label>
            <input
              type="number"
              value={freeShippingLimit}
              onChange={(e) => setFreeShippingLimit(Number(e.target.value))}
              style={{ background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px', color: '#ffffff' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af' }}>Priority Express Fee (₹)</label>
            <input
              type="number"
              value={expressRate}
              onChange={(e) => setExpressRate(Number(e.target.value))}
              style={{ background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px', color: '#ffffff' }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#9a6233', color: '#ffffff', padding: '12px', borderRadius: '6px', fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: '12px' }}
        >
          <Save size={16} /> Save Configuration
        </button>
      </form>
    </div>
  );
};

