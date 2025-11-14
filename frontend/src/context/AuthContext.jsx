import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { setToken, getToken, removeToken, setUser, getUser, removeUser } from '../utils/localStorage';
import * as authService from '../services/authService';
import { setLogoutCallback } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const tokenCheckIntervalRef = useRef(null);

  const logout = useCallback(() => {
    removeToken();
    removeUser();
    setUserState(null);
    
    // Clear token check interval
    if (tokenCheckIntervalRef.current) {
      clearInterval(tokenCheckIntervalRef.current);
      tokenCheckIntervalRef.current = null;
    }
  }, []);

  // Set logout callback for axios interceptor
  useEffect(() => {
    setLogoutCallback(logout);
    return () => {
      setLogoutCallback(null);
    };
  }, [logout]);

  const validateToken = useCallback(async (silent = false) => {
    const token = getToken();
    if (!token) {
      if (!silent) {
        setUserState(null);
      }
      return false;
    }

    try {
      const freshUser = await authService.getProfile();
      setUserState(freshUser);
      setUser(freshUser);
      return true;
    } catch (error) {
      console.error("Token validation failed, logging out.", error);
      if (!silent) {
        logout();
      }
      return false;
    }
  }, [logout]);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const token = getToken();
      if (token) {
        // Only validate if token exists
        await validateToken(true);
      } else {
        // No token is normal for first visit
        setUserState(null);
      }
      setLoading(false);
    };

    initializeAuth();

    // Set up periodic token validation (every 5 minutes) - only if token exists
    tokenCheckIntervalRef.current = setInterval(() => {
      const token = getToken();
      if (token) {
        validateToken(true);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      if (tokenCheckIntervalRef.current) {
        clearInterval(tokenCheckIntervalRef.current);
      }
    };
  }, [validateToken]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      setToken(data.token);
      setUser(data.user);
      setUserState(data.user);
      // Don't validate immediately after login - we already have the user data
      return data.user; 
    } catch (error) {
      console.error('Login failed:', error);
      throw error.response?.data?.message || error.message || 'Failed to log in. Please check your credentials.';
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData) => {
    setLoading(true);
    try {
      const data = await authService.signup(userData);
      setToken(data.token);
      setUser(data.user);
      setUserState(data.user);
      // Don't validate immediately after signup - we already have the user data
      return data.user;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error.response?.data?.message || error.message || 'Failed to sign up. Please check your information.';
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const freshUser = await authService.getProfile();
      setUser(freshUser);
      setUserState(freshUser);
      return freshUser;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      logout();
      throw error;
    }
  }, [logout]);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user && !!getToken(),
    isAdmin: user?.role === 'System Administrator',
    isStoreOwner: user?.role === 'Store Owner',
    isNormalUser: user?.role === 'Normal User',
    login,
    signup,
    logout,
    loading,
    refreshUser,
    validateToken,
  }), [user, loading, login, signup, logout, refreshUser, validateToken]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
