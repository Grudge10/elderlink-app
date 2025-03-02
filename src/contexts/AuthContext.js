import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is logged in when the app loads
  useEffect(() => {
    const user = localStorage.getItem('elderlink_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Register a new user
  const register = async (email, password, name) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user object
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name,
        emailVerified: false,
        createdAt: new Date().toISOString()
      };
      
      // Store user data locally (in a real app, this would be server-side)
      localStorage.setItem('elderlink_user', JSON.stringify(newUser));
      setCurrentUser(newUser);
      
      toast.success('Account created successfully! Please verify your email.');
      return newUser;
    } catch (err) {
      setError('Failed to create an account');
      toast.error('Failed to create an account');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login a user
  const login = async (email, password) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would verify credentials against a database
      const user = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name: "Demo User",
        emailVerified: true,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('elderlink_user', JSON.stringify(user));
      setCurrentUser(user);
      
      toast.success('Logged in successfully!');
      return user;
    } catch (err) {
      setError('Failed to login');
      toast.error('Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout a user
  const logout = () => {
    localStorage.removeItem('elderlink_user');
    localStorage.removeItem('elderlink_profile');
    setCurrentUser(null);
    toast.info('Logged out successfully');
  };

  // Send password reset email
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password reset email sent!');
    } catch (err) {
      setError('Failed to send password reset email');
      toast.error('Failed to send password reset email');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update email
  const updateEmail = async (newEmail) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...currentUser,
        email: newEmail
      };
      
      localStorage.setItem('elderlink_user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      toast.success('Email updated successfully!');
    } catch (err) {
      setError('Failed to update email');
      toast.error('Failed to update email');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update password
  const updatePassword = async (newPassword) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password updated successfully!');
    } catch (err) {
      setError('Failed to update password');
      toast.error('Failed to update password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Verify email
  const verifyEmail = async (code) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...currentUser,
        emailVerified: true
      };
      
      localStorage.setItem('elderlink_user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      toast.success('Email verified successfully!');
    } catch (err) {
      setError('Failed to verify email');
      toast.error('Failed to verify email');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    verifyEmail,
    setLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
