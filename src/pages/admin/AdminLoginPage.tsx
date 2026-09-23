import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Key } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useAdminStore } from '../../store/useAdminStore';
import { INITIAL_ADMIN_USER } from '../../data/mockData';
import './AdminLoginPage.scss';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@velobags.com');
  const [password, setPassword] = useState('supersecret2026');
  const [error, setError] = useState<string | null>(null);

  const adminLogin = useAuthStore((s) => s.adminLogin);
  const addAuditLog = useAdminStore((s) => s.addAuditLog);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@velobags.com') {
      adminLogin(INITIAL_ADMIN_USER);
      addAuditLog({
        adminName: INITIAL_ADMIN_USER.name,
        adminEmail: INITIAL_ADMIN_USER.email,
        action: 'ADMIN_AUTHENTICATED',
        targetEntity: 'Admin Portal Access',
        details: 'Director session opened from secure management console.',
        ipAddress: '127.0.0.1'
      });
    } else {
      setError('Invalid administration credentials.');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box">
        <div className="box-head">
          <div className="lock-icon-wrap">
            <Lock size={26} />
          </div>
          <span className="platform-tag">INTERNAL COMMERCE SUITE</span>
          <h1 className="portal-title">VELO &amp; CO. COMMAND</h1>
          <p className="portal-desc">
            Restricted administrative gateway. Direct access only.
          </p>
        </div>

        {error && <div className="login-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="field-group">
            <label>Staff Email</label>
            <div className="input-wrap">
              <Mail size={18} className="field-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@velobags.com"
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label>Security Keyphrase</label>
            <div className="input-wrap">
              <Key size={18} className="field-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-admin-submit">
            Authenticate Session
          </button>
        </form>

        <div className="box-footer">
          <ShieldCheck size={16} />
          <span>FIPS 140-2 Level 3 Hardware Security Module Active</span>
        </div>
      </div>
    </div>
  );
};

