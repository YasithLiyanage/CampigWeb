import React, { useState } from 'react';
import './EmailVerification.css';

export function EmailVerification({ email, isVerified, onResendVerification }) {
  const [isResending, setIsResending] = useState(false);

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await onResendVerification();
      alert('Verification email sent successfully!');
    } catch (error) {
      alert('Failed to send verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  if (isVerified) {
    return (
      <div className="email-verification verified">
        <div className="verification-icon verified-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 11l3 3l8-8"></path>
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9c1.51 0 2.93.37 4.18 1.03"></path>
          </svg>
        </div>
        <div className="verification-content">
          <h3>Email Verified</h3>
          <p>Your email address has been verified.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="email-verification pending">
      <div className="verification-icon warning-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <div className="verification-content">
        <h3>Email Verification Required</h3>
        <p>
          We've sent a verification email to <span className="email-highlight">{email}</span>. 
          Please check your inbox and click the verification link.
        </p>
        <button 
          onClick={handleResendVerification}
          disabled={isResending}
          className="resend-btn"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isResending ? 'spinning' : ''}>
            <polyline points="23,4 23,10 17,10"></polyline>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
          {isResending ? 'Sending...' : 'Resend verification email'}
        </button>
      </div>
    </div>
  );
}