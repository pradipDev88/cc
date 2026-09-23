import React from 'react';
import { ShieldAlert, Terminal, Lock } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';

export const AdminAuditLogsPage: React.FC = () => {
  const auditLogs = useAdminStore((s) => s.auditLogs);

  return (
    <div className="admin-audit-page" style={{ color: '#e5e7eb' }}>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '0.6875rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, color: '#9a6233', display: 'block', marginBottom: '4px' }}>IMMUTABLE SECURITY TRAIL</span>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff' }}>Administrative Audit Trail ({auditLogs.length} Events)</h1>
      </div>

      <div style={{ background: '#15161b', border: '1px solid #242630', borderRadius: '8px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ background: '#101115', borderBottom: '1px solid #242630' }}>
              <th style={{ padding: '12px 18px', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.6875rem' }}>Timestamp</th>
              <th style={{ padding: '12px 18px', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.6875rem' }}>Officer</th>
              <th style={{ padding: '12px 18px', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.6875rem' }}>Action Code</th>
              <th style={{ padding: '12px 18px', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.6875rem' }}>Target Entity</th>
              <th style={{ padding: '12px 18px', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.6875rem' }}>Log Event Detail</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid #1e2028' }}>
                <td style={{ padding: '14px 18px', color: '#6b7280', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                <td style={{ padding: '14px 18px', color: '#ffffff', fontWeight: 600 }}>{log.adminName}</td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ background: '#222530', color: '#9a6233', padding: '3px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {log.action}
                  </span>
                </td>
                <td style={{ padding: '14px 18px', color: '#9ca3af' }}>{log.targetEntity}</td>
                <td style={{ padding: '14px 18px', color: '#d1d5db' }}>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

