// components/auth/SecurityActivity.jsx
import React from 'react';
import './SecurityActivity.css';

export function SecurityActivity({ recentActivities }) {
  return (
    <div className="security-activity">
      <div className="security-activity-header">
        <div className="header-with-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <h2>Security Activity</h2>
        </div>
        <p>Recent account activity and security events</p>
      </div>
      
      <div className="activity-content">
        <table className="activity-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Time</th>
              <th className="hidden-mobile">IP Address</th>
              <th className="hidden-mobile">Location</th>
              <th className="hidden-tablet">Device</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity.id} className="activity-row">
                <td>
                  <div className="activity-action">
                    <div className={`status-indicator ${activity.status}`}></div>
                    <span className="action-text">{activity.action}</span>
                  </div>
                </td>
                <td className="activity-time">{activity.timestamp}</td>
                <td className="hidden-mobile activity-ip">{activity.ip}</td>
                <td className="hidden-mobile activity-location">{activity.location}</td>
                <td className="hidden-tablet activity-device">
                  {activity.device || 'Unknown'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {recentActivities.length === 0 && (
          <div className="no-activity">
            <div className="no-activity-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <p>No recent activity found</p>
          </div>
        )}
        
        <div className="activity-footer">
          <button className="view-all-btn">
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
}