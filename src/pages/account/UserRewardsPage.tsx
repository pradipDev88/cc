import React from 'react';
import { Award, CheckCircle2, Gift } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import './UserRewardsPage.scss';

export const UserRewardsPage: React.FC = () => {
  const { customer } = useAuthStore();
  const points = customer?.loyaltyPoints || 1240;

  const tiers = [
    { name: 'BRONZE', min: 0, perks: 'Standard 2-yr warranty, quarterly private releases' },
    { name: 'SILVER', min: 500, perks: '5% bonus miles on checkout, complimentary monograms' },
    { name: 'GOLD', min: 1000, perks: 'Free express shipping on all orders, zero-questions doorstep return pickup' },
    { name: 'PLATINUM', min: 2500, perks: 'Private concierge line, bespoke atelier leather embossing, annual anniversary gift' }
  ];

  return (
    <div className="user-rewards-page">
      <div className="page-header">
        <h2 className="heading-2">Collector Rewards &amp; Carry Miles</h2>
        <p className="lead-text">Earn miles on every precision carry gear purchase and elevate your privilege tier.</p>
      </div>

      <div className="rewards-hero-card">
        <div className="miles-badge">
          <Award size={36} className="badge-icon" />
          <div className="miles-val-box">
            <span className="miles-num">{points}</span>
            <span className="miles-label">Available Carry Miles</span>
          </div>
        </div>

        <div className="tier-progress-area">
          <div className="tier-labels">
            <span>Current: <strong>GOLD TIER</strong></span>
            <span>Next: <strong>PLATINUM (1,260 miles to upgrade)</strong></span>
          </div>
          <div className="tier-bar-track">
            <div className="tier-bar-fill" style={{ width: '48%' }} />
          </div>
        </div>
      </div>

      <h3 className="tiers-grid-title">Collector Privilege Hierarchy</h3>
      <div className="tiers-grid">
        {tiers.map((t) => {
          const isCurrent = t.name === 'GOLD';
          return (
            <div key={t.name} className={`tier-card ${isCurrent ? 'current-tier' : ''}`}>
              <div className="tier-card-head">
                <h4>{t.name}</h4>
                {isCurrent && <span className="active-tag">Active Tier</span>}
              </div>
              <span className="points-threshold">{t.min}+ Miles Required</span>
              <p className="tier-perks">{t.perks}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

