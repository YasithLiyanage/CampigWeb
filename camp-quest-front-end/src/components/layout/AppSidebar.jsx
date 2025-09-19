import React, { useState } from 'react';
import './AppSidebar.css';

export function AppSidebar({ user, currentPath }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9,22 9,12 15,12 15,22"></polyline>
        </svg>
      ),
    },
    {
      name: 'User Management',
      path: '/admin/users',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      adminOnly: true,
    },
    {
      name: 'Inventory',
      path: '/inventory',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27,6.96 12,12.01 20.73,6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
    },
    {
      name: 'Rentals & Sales',
      path: '/rentals',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      ),
    },
    {
      name: 'Security Settings',
      path: '/security',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
    },
  ];

  const checkPermission = (item) => {
    if (item.adminOnly && user?.role !== 'admin') return false;
    return true;
  };

  return (
    <aside className={`app-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <a href="/" className="sidebar-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3.5 21 14 3l10.5 18H3.5Z"></path>
            <path d="M12 13.5 7.5 21"></path>
            <path d="M16.5 21 12 13.5"></path>
          </svg>
          {!isCollapsed && <span>Camp Quest</span>}
        </a>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navigationItems.map((item) => {
            if (!checkPermission(item)) return null;
            const isActive = currentPath === item.path;
            
            return (
              <li key={item.name}>
                <a
                  href={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isCollapsed && <span className="nav-text">{item.name}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          {!isCollapsed && (
            <>
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="sidebar-user-avatar" />
              ) : (
                <div className="sidebar-user-avatar-placeholder">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
              <div className="user-details">
                <p className="user-name">{user?.name}</p>
                <p className="user-role">{user?.role}</p>
              </div>
            </>
          )}
        </div>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="collapse-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points={isCollapsed ? "9,18 15,12 9,6" : "15,18 9,12 15,6"}></polyline>
          </svg>
        </button>
      </div>
    </aside>
  );
}
