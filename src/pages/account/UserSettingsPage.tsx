import React, { useState } from 'react';
import { User, Shield, Key, Bell, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useToastStore } from '../../store/useToastStore';
import './UserSettingsPage.scss';

export const UserSettingsPage: React.FC = () => {
  const { customer, customerLogin } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);

  const [name, setName] = useState(customer?.name || 'Ashish Ojha');
  const [email, setEmail] = useState(customer?.email || 'ashish.ojha@example.com');
  const [phone, setPhone] = useState(customer?.phone || '+91 98765 43210');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    customerLogin({
      ...customer,
      name,
      email,
      phone
    });
    addToast({
      type: 'success',
      title: 'Profile Updated',
      description: 'Your collector profile information was saved.'
    });
  };

  return (
    <div className="user-settings-page">
      <div className="page-header">
        <h2 className="heading-2">Account Settings &amp; Preferences</h2>
        <p className="lead-text">Update your personal contact details, security credentials, and notifications.</p>
      </div>

      <form onSubmit={handleSaveProfile} className="settings-form">
        <div className="form-section">
          <h3 className="section-title">Personal Details</h3>
          <div className="inputs-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Registered Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Primary Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Communication Preferences</h3>
          <div className="checkboxes-stack">
            <label className="pref-row">
              <input type="checkbox" defaultChecked />
              <span>SMS order dispatch &amp; delivery notifications</span>
            </label>
            <label className="pref-row">
              <input type="checkbox" defaultChecked />
              <span>Email invitations to private VIP collection drops</span>
            </label>
            <label className="pref-row">
              <input type="checkbox" defaultChecked />
              <span>Instant alerts on saved wishlist price drops</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

