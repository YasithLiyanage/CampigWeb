// App.jsx
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { AppLayout } from './components/layout/AppLayout';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function AppContent() {
  const { user, isAuthenticated, isLoading, login, register, logout, forgotPassword } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // If user is authenticated, show dashboard
  if (isAuthenticated) {
    return (
      <AppLayout user={user} onLogout={logout} currentPath="/dashboard">
        <Dashboard user={user} />
      </AppLayout>
    );
  }

  // If not authenticated, show public pages
  switch (currentPage) {
    case 'login':
      return (
        <Login 
          onLogin={login}
          onNavigate={handleNavigate}
        />
      );
    case 'register':
      return (
        <Register 
          onRegister={register}
          onNavigate={handleNavigate}
        />
      );
    case 'forgot-password':
      return (
        <ForgotPassword 
          onForgotPassword={forgotPassword}
          onNavigate={handleNavigate}
        />
      );
    default:
      return (
        <div>
          <Home />
          {/* Add login/register buttons for navigation */}
          <div className="auth-nav-buttons">
            <button 
              onClick={() => handleNavigate('login')}
              className="btn-primary"
            >
              Login
            </button>
            <button 
              onClick={() => handleNavigate('register')}
              className="btn-secondary"
            >
              Register
            </button>
          </div>
        </div>
      );
  }
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}