import React from 'react';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import './AppLayout.css';

export function AppLayout({ children, user, onLogout, currentPath = '/' }) {
  return (
    <div className="app-layout">
      <AppSidebar user={user} currentPath={currentPath} />
      <div className="app-main">
        <AppHeader user={user} onLogout={onLogout} />
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}
