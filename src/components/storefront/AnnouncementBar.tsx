import React from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import './AnnouncementBar.scss';

export const AnnouncementBar: React.FC = () => {
  const { announcementText, isAnnouncementActive } = useAdminStore();

  if (!isAnnouncementActive || !announcementText) return null;

  return (
    <div className="announcement-bar" role="region" aria-label="Store Announcement">
      <div className="announcement-content">
        <span className="announcement-dot" />
        <p className="announcement-text">{announcementText}</p>
        <span className="announcement-dot" />
      </div>
    </div>
  );
};

