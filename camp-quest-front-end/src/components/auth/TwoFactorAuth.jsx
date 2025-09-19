// components/auth/TwoFactorAuth.jsx
import React, { useState } from 'react';
import './TwoFactorAuth.css';

export function TwoFactorAuth({
  isEnabled,
  onEnable,
  onVerify,
  onDisable,
  preferredMethod = '2fa',
  onChangeMethod,
  phone
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);

  const handleEnable = async () => {
    setIsLoading(true);
    try {
      const result = await onEnable();
      if (result.qrCode) setQrCode(result.qrCode);
      if (result.secret) setSecret(result.secret);
      setShowSetup(true);
    } catch (error) {
      alert('Failed to enable two-factor authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      alert('Please enter a valid 6-digit verification code');
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await onVerify(verificationCode);
      if (success) {
        alert('Two-factor authentication enabled successfully');
        setShowSetup(false);
      } else {
        alert('Invalid verification code. Please try again.');
      }
    } catch (error) {
      alert('Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable = async () => {
    setIsLoading(true);
    try {
      const success = await onDisable();
      if (success) {
        alert('Two-factor authentication disabled');
        setShowDisableConfirm(false);
      } else {
        alert('Failed to disable two-factor authentication');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeMethod = async (method) => {
    setIsLoading(true);
    try {
      await onChangeMethod(method);
      const methodName = method === '2fa' ? 'Authenticator App' : method === 'email' ? 'Email' : 'SMS';
      alert(`Two-factor authentication method changed to ${methodName}`);
    } catch (error) {
      alert('Failed to change authentication method');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSetup) {
    return (
      <div className="two-factor-auth setup">
        <h3>Set Up Two-Factor Authentication</h3>
        <p>Scan the QR code below with your authenticator app (like Google Authenticator, Authy, or Microsoft Authenticator).</p>
        
        {qrCode && (
          <div className="qr-code-container">
            <img src={qrCode} alt="QR Code" className="qr-code" />
          </div>
        )}
        
        {secret && (
          <div className="manual-code">
            <p>Or enter this code manually in your app:</p>
            <div className="secret-code">{secret}</div>
          </div>
        )}
        
        <div className="verification-input">
          <label htmlFor="verificationCode">Verification Code</label>
          <input
            id="verificationCode"
            type="text"
            maxLength={6}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit code"
            className="verification-code-input"
          />
        </div>
        
        <div className="setup-actions">
          <button onClick={() => setShowSetup(false)} className="btn-secondary">
            Cancel
          </button>
          <button 
            onClick={handleVerify}
            disabled={isLoading || verificationCode.length !== 6}
            className="btn-primary"
          >
            {isLoading ? 'Verifying...' : 'Verify & Enable'}
          </button>
        </div>
      </div>
    );
  }

  if (showDisableConfirm) {
    return (
      <div className="two-factor-auth disable-confirm">
        <div className="disable-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <h3>Disable Two-Factor Authentication?</h3>
        <p>This will make your account less secure. Are you sure you want to continue?</p>
        <div className="disable-actions">
          <button onClick={() => setShowDisableConfirm(false)} className="btn-secondary">
            Cancel
          </button>
          <button 
            onClick={handleDisable}
            disabled={isLoading}
            className="btn-danger"
          >
            {isLoading ? 'Disabling...' : 'Disable 2FA'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="two-factor-auth main">
      <h3>Two-Factor Authentication</h3>
      <div className="auth-status">
        <div className="status-info">
          <p className="status-title">Protect your account with 2FA</p>
          <p className="status-description">
            Add an extra layer of security to your account by requiring a verification code when you sign in.
          </p>
        </div>
        <button 
          onClick={isEnabled ? () => setShowDisableConfirm(true) : handleEnable}
          disabled={isLoading}
          className={isEnabled ? "btn-danger" : "btn-primary"}
        >
          {isLoading ? 'Loading...' : (isEnabled ? 'Disable' : 'Enable')}
        </button>
      </div>

      {isEnabled && (
        <div className="auth-methods">
          <p className="methods-title">Authentication Method</p>
          <div className="method-options">
            <div className="method-option">
              <input
                type="radio"
                id="method-2fa"
                name="auth-method"
                checked={preferredMethod === '2fa'}
                onChange={() => handleChangeMethod('2fa')}
              />
              <label htmlFor="method-2fa" className="method-label">
                <div className="method-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Authenticator App</span>
                </div>
                <p>Use an authenticator app like Google Authenticator or Authy</p>
              </label>
            </div>
            
            <div className="method-option">
              <input
                type="radio"
                id="method-email"
                name="auth-method"
                checked={preferredMethod === 'email'}
                onChange={() => handleChangeMethod('email')}
              />
              <label htmlFor="method-email" className="method-label">
                <div className="method-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>Email</span>
                </div>
                <p>Receive verification codes via email</p>
              </label>
            </div>
            
            <div className="method-option">
              <input
                type="radio"
                id="method-sms"
                name="auth-method"
                checked={preferredMethod === 'sms'}
                onChange={() => handleChangeMethod('sms')}
                disabled={!phone}
              />
              <label htmlFor="method-sms" className="method-label">
                <div className="method-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                  <span>SMS</span>
                </div>
                <p>
                  {phone 
                    ? `Receive verification codes via SMS at ${phone}`
                    : 'Add a phone number in your profile to enable SMS verification'
                  }
                </p>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="security-notice">
        <div className="notice-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <p>
          Two-factor authentication adds an extra layer of security to your account by requiring 
          a verification code in addition to your password when you sign in.
        </p>
      </div>
    </div>
  );
}