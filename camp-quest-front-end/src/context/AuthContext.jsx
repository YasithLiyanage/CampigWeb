import React, { useEffect, useState, createContext, useContext } from 'react';

// Mock user for demonstration
const MOCK_USER = {
  id: '1',
  email: 'demo@campquest.com',
  name: 'Demo User',
  role: 'customer',
  profilePicture: 'https://i.pravatar.cc/150?u=demo@campquest.com',
  createdAt: new Date(),
  lastLogin: new Date(),
};

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for stored user session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('campquest_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('campquest_user');
      }
    }
    setLoading(false);
  }, []);

  // Mock authentication functions
  const login = async (email, password, remember = false) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll just set the mock user
    if (email === 'demo@campquest.com' && password === 'password') {
      setCurrentUser(MOCK_USER);
      if (remember) {
        localStorage.setItem('campquest_user', JSON.stringify(MOCK_USER));
      }
    } else {
      throw new Error('Invalid email or password');
    }
    setLoading(false);
  };

  const register = async (email, password, name) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newUser = {
      ...MOCK_USER,
      email,
      name,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCurrentUser(newUser);
    localStorage.setItem('campquest_user', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem('campquest_user');
    await new Promise((resolve) => setTimeout(resolve, 300));
  };

  const forgotPassword = async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real app, this would trigger a password reset email
  };

  const resetPassword = async (token, newPassword) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real app, this would validate the token and update the password
  };

  const updateProfile = async (data) => {
    if (!currentUser) return;
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const updatedUser = {
      ...currentUser,
      ...data,
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('campquest_user', JSON.stringify(updatedUser));
  };

  const changePassword = async (oldPassword, newPassword) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (oldPassword !== 'password') {
      throw new Error('Current password is incorrect');
    }
    // In a real app, this would update the password in the backend
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};