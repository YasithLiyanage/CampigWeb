import React from 'react';
import './PasswordStrengthMeter.css';

export function PasswordStrengthMeter({ password }) {
  const passwordRequirements = [
    {
      text: 'At least 8 characters',
      met: password.length >= 8,
    },
    {
      text: 'At least one uppercase letter',
      met: /[A-Z]/.test(password),
    },
    {
      text: 'At least one lowercase letter',
      met: /[a-z]/.test(password),
    },
    {
      text: 'At least one number',
      met: /[0-9]/.test(password),
    },
    {
      text: 'At least one special character',
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const strengthPercentage = (passwordRequirements.filter(req => req.met).length / passwordRequirements.length) * 100;
  
  let strengthColor = '#ef4444';
  let strengthText = 'Weak';
  
  if (strengthPercentage >= 80) {
    strengthColor = '#22c55e';
    strengthText = 'Strong';
  } else if (strengthPercentage >= 60) {
    strengthColor = '#eab308';
    strengthText = 'Good';
  } else if (strengthPercentage >= 40) {
    strengthColor = '#f97316';
    strengthText = 'Fair';
  }

  return (
    <div className="password-strength-meter">
      <div className="strength-header">
        <span className="strength-label">Password strength:</span>
        <span className="strength-text" style={{ color: strengthColor }}>
          {strengthText}
        </span>
      </div>
      <div className="strength-bar">
        <div 
          className="strength-fill"
          style={{ 
            width: `${strengthPercentage}%`,
            backgroundColor: strengthColor 
          }}
        ></div>
      </div>
      <div className="requirements-list">
        {passwordRequirements.map((req, index) => (
          <div key={index} className="requirement-item">
            <div className={`requirement-icon ${req.met ? 'met' : 'unmet'}`}>
              {req.met ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3l8-8"></path>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9c1.51 0 2.93.37 4.18 1.03"></path>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              )}
            </div>
            <span className={`requirement-text ${req.met ? 'met' : 'unmet'}`}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}