// components/auth/SessionManager.jsx
import React, { useState } from 'react';
import './SessionManager.css';

export function SessionManager({ sessions, onRevokeSession, onRevokeAllSessions }) {
  const [isLoading, setIsLoading] = useState(null);
  const [isRevokingAll, setIsRevokingAll] = useState(false);
  const [showConfirmRevokeAll, setShowConfirmRevokeAll] = useState(false);

  const handleRevokeSession = async (sessionId) => {
    setIsLoading(sessionId);
    try {
      await onRevokeSession(sessionId);
      alert('Session revoked successfully');
    } catch (error) {
      alert('Failed to revoke session');
    } finally {
      setIsLoading(null);
    }
  };

  const handleRevokeAllSessions = async () => {
    setIsRevokingAll(true);
    try {
      await onRevokeAllSessions();
      alert('All sessions revoked successfully');
      setShowConfirmRevokeAll(false);
    } catch (error) {
      alert('Failed to revoke all sessions');
    } finally {
      setIsRevokingAll(false);
    }
  };

  const getDeviceIcon = (device) => {
    switch (device) {
      case 'mobile':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
        );
      case 'tablet':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tablet-icon">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
        );
      case 'desktop':
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        );
    }
  };

  if (showConfirmRevokeAll) {
    return (
      <div className="session-manager confirm-revoke">
        <h3>Log Out of All Devices?</h3>
        <p>
          This will terminate all active sessions except your current one.
          You'll need to log in again on other devices.
        </p>
        <div className="confirm-actions">
          <button
            onClick={() => setShowConfirmRevokeAll(false)}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleRevokeAllSessions}
            disabled={isRevokingAll}
            className="btn-danger"
          >
            {isRevokingAll ? 'Logging out...' : 'Log Out All Devices'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="session-manager">
      <div className="session-header">
        <h3>Active Sessions</h3>
        {sessions.length > 1 && (
          <button
            onClick={() => setShowConfirmRevokeAll(true)}
            className="revoke-all-btn"
          >
            Logout of all devices
          </button>
        )}
      </div>
      
      <div className="sessions-list">
        {sessions.map((session) => (
          <div key={session.id} className="session-item">
            <div className="session-info">
              <div className="session-device">
                <div className="device-icon">
                  {getDeviceIcon(session.device)}
                </div>
                <div className="session-details">
                  <div className="session-browser">
                    <span className="browser-name">{session.browser}</span>
                    {session.isCurrent && (
                      <span className="current-badge">Current</span>
                    )}
                  </div>
                  <p className="session-location">
                    {session.location} • {session.ip}
                  </p>
                </div>
              </div>
              {!session.isCurrent && (
                <button
                  onClick={() => handleRevokeSession(session.id)}
                  disabled={isLoading === session.id}
                  className="revoke-btn"
                  title="Revoke session"
                >
                  {isLoading === session.id ? (
                    <div className="mini-spinner"></div>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  )}
                </button>
              )}
            </div>
            <p className="session-last-active">
              Last active: {session.lastActive}
            </p>
          </div>
        ))}
        
        {sessions.length === 0 && (
          <div className="no-sessions">
            <p>No active sessions found</p>
          </div>
        )}
      </div>
    </div>
  );
}