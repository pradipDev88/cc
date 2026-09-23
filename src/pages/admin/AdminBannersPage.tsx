import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';
import { BannerSlide } from '../../types';
import './AdminBannersPage.scss';

export const AdminBannersPage: React.FC = () => {
  const banners = useAdminStore((s) => s.banners);
  const addBanner = useAdminStore((s) => s.addBanner);
  const deleteBanner = useAdminStore((s) => s.deleteBanner);
  const announcementText = useAdminStore((s) => s.announcementText);
  const setAnnouncement = useAdminStore((s) => s.setAnnouncement);
  const addToast = useToastStore((s) => s.addToast);

  const [announcementInput, setAnnouncementInput] = useState(announcementText);

  // New Banner State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [tagline, setTagline] = useState('EXCLUSIVE COLLECTION');
  const [ctaText, setCtaText] = useState('EXPLORE NOW');
  const [ctaLink, setCtaLink] = useState('/category/school-bags');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1800&auto=format&fit=crop');

  const handleUpdateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    setAnnouncement(announcementInput, true);
    addToast({
      type: 'success',
      title: 'Announcement Strip Updated',
      description: 'The top marquee was updated on the storefront.'
    });
  };

  const handleCreateBanner = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlide: BannerSlide = {
      id: 'ban-' + Date.now(),
      title: title.toUpperCase(),
      subtitle: subtitle.toUpperCase(),
      tagline,
      ctaText,
      ctaLink,
      imageUrl,
      categoryTag: 'Curated',
      sortOrder: banners.length + 1,
      isActive: true
    };

    addBanner(newSlide);
    addToast({
      type: 'success',
      title: 'Hero Slide Published',
      description: 'The slide has been inserted into the homepage carousel.'
    });

    setTitle('');
    setSubtitle('');
  };

  return (
    <div className="admin-banners-page" style={{ color: '#e5e7eb' }}>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '0.6875rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, color: '#9a6233', display: 'block', marginBottom: '4px' }}>STOREFRONT CMS</span>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff' }}>Homepage Banners &amp; Announcement Strip</h1>
      </div>

      {/* Announcement Marquee Editor */}
      <form onSubmit={handleUpdateAnnouncement} style={{ background: '#15161b', border: '1px solid #242630', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>Live Storefront Announcement Marquee</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={announcementInput}
            onChange={(e) => setAnnouncementInput(e.target.value)}
            style={{ flex: 1, minWidth: '240px', background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px 14px', color: '#ffffff' }}
          />
          <button type="submit" style={{ background: '#9a6233', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '10px 20px', fontWeight: 600, cursor: 'pointer' }}>
            Save Strip
          </button>
        </div>
      </form>

      {/* Hero Banners Grid */}
      <div className="banners-layout-grid">
        {/* Creation Form */}
        <form onSubmit={handleCreateBanner} className="banner-create-form">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>Add Hero Slide</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>Main Headline</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. READY FOR THE MONSOON"
              style={{ background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px', color: '#ffffff' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. 100% SEAM-SEALED WATERPROOF PROTECTION"
              style={{ background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px', color: '#ffffff' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>High-Res Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={{ background: '#0f1013', border: '1px solid #252834', borderRadius: '6px', padding: '10px', color: '#ffffff' }}
              required
            />
          </div>

          <button
            type="submit"
            style={{ background: '#9a6233', color: '#ffffff', padding: '12px', borderRadius: '6px', fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: '8px' }}
          >
            Insert Banner Slide
          </button>
        </form>

        {/* Existing Carousel Slides */}
        <div style={{ background: '#15161b', border: '1px solid #242630', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>Live Hero Slides ({banners.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {banners.map((b) => (
              <div key={b.id} style={{ display: 'flex', gap: '16px', background: '#101115', border: '1px solid #232530', padding: '12px', borderRadius: '6px', alignItems: 'center' }}>
                <img src={b.imageUrl} alt={b.title} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#ffffff', fontSize: '0.9375rem' }}>{b.title}</strong>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{b.subtitle}</p>
                </div>
                <button
                  onClick={() => deleteBanner(b.id)}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px' }}
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

