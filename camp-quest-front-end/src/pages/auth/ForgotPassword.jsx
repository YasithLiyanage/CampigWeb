// pages/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import './Auth.css';

export function ForgotPassword({ onForgotPassword, onNavigate }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await onForgotPassword(email);
      setSuccess(true);
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3.5 21 14 3l10.5 18H3.5Z"></path>
                <path d="M12 13.5 7.5 21"></path>
                <path d="M16.5 21 12 13.5"></path>
              </svg>
            </div>
            <h1>Camp Quest</h1>
            <p>Smart Camping Equipment Rental</p>
          </div>

          <div className="auth-form-container">
            <div className="success-content">
              <div className="success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3l8-8"></path>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9c1.51 0 2.93.37 4.18 1.03"></path>
                </svg>
              </div>
              <h2>Check your email</h2>
              <p>
                We've sent a password reset link to <span className="email-highlight">{email}</span>. 
                Please check your inbox and spam folder.
              </p>
              <p className="resend-text">
                Didn't receive an email? Check your spam folder or{' '}
                <button
                  onClick={() => setSuccess(false)}
                  className="resend-link"
                >
                  try again
                </button>
              </p>
            </div>
            
            <div className="auth-footer">
              <button
                onClick={() => onNavigate('login')}
                className="auth-link"
              >
                Back to login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3.5 21 14 3l10.5 18H3.5Z"></path>
              <path d="M12 13.5 7.5 21"></path>
              <path d="M16.5 21 12 13.5"></path>
            </svg>
          </div>
          <h1>Camp Quest</h1>
          <p>Smart Camping Equipment Rental</p>
        </div>

        <div className="auth-form-container">
          <h2>Forgot your password?</h2>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
          
          {error && (
            <div className="error-alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className={error ? 'error' : ''}
                placeholder="name@example.com"
              />
              {error && (
                <div className="field-error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {error}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="auth-submit-btn"
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Sending...
                </>
              ) : (
                'Send reset link'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <button
              onClick={() => onNavigate('login')}
              className="auth-link"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}