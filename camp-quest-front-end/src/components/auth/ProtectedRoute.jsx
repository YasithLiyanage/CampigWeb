import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './ProtectedRoute.css';

export function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, isLoading, checkPermission } = useAuth();

  if (isLoading) {
    return (
      <div className="protected-route-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login - in a real app you'd use React Router
    window.location.href = '/login';
    return null;
  }

  if (requiredRole && !checkPermission(requiredRole)) {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <div className="access-denied-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="back-home-btn"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}