import React from 'react';
import { Users, Mail, Phone, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';

export const AdminCustomersPage: React.FC = () => {
  const orders = useOrderStore((s) => s.orders);

  const customersList = [
    {
      id: 'cust-01',
      name: 'Ashish Ojha',
      email: 'ashish.ojha@example.com',
      phone: '+91 98765 43210',
      tier: 'GOLD',
      ordersCount: orders.length,
      spent: orders.reduce((s, o) => s + o.totalAmount, 0),
      city: 'Bengaluru'
    },
    {
      id: 'cust-02',
      name: 'Vikram Malhotra',
      email: 'vikram.malhotra@corporate.in',
      phone: '+91 98201 22334',
      tier: 'PLATINUM',
      ordersCount: 4,
      spent: 24900,
      city: 'Mumbai'
    },
    {
      id: 'cust-03',
      name: 'Ananya Deshmukh',
      email: 'ananya.deshmukh@gmail.com',
      phone: '+91 97654 88123',
      tier: 'SILVER',
      ordersCount: 2,
      spent: 5698,
      city: 'Pune'
    }
  ];

  return (
    <div className="admin-customers-page" style={{ color: '#e5e7eb' }}>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '0.6875rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, color: '#9a6233', display: 'block', marginBottom: '4px' }}>AUDIENCE CRM</span>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff' }}>Registered Collector Profiles</h1>
      </div>

      <div style={{ background: '#15161b', border: '1px solid #242630', borderRadius: '8px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ background: '#101115', borderBottom: '1px solid #242630' }}>
              <th style={{ padding: '12px 18px', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.6875rem' }}>Collector Name</th>
              <th style={{ padding: '12px 18px', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.6875rem' }}>Contact Channels</th>
              <th style={{ padding: '12px 18px', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.6875rem' }}>Privilege Tier</th>
              <th style={{ padding: '12px 18px', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.6875rem' }}>Orders Placed</th>
              <th style={{ padding: '12px 18px', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.6875rem' }}>Lifetime Value (LTV)</th>
              <th style={{ padding: '12px 18px', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.6875rem' }}>City</th>
            </tr>
          </thead>
          <tbody>
            {customersList.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #1e2028' }}>
                <td style={{ padding: '14px 18px', color: '#ffffff', fontWeight: 600 }}>{c.name}</td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#d1d5db' }}>{c.email}</span>
                    <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{c.phone}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontSize: '0.6875rem', fontWeight: 700 }}>
                    {c.tier}
                  </span>
                </td>
                <td style={{ padding: '14px 18px', color: '#ffffff' }}>{c.ordersCount} Consignments</td>
                <td style={{ padding: '14px 18px', color: '#10b981', fontWeight: 700 }}>₹{c.spent.toLocaleString('en-IN')}</td>
                <td style={{ padding: '14px 18px', color: '#9ca3af' }}>{c.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

