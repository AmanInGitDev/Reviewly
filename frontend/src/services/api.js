import axios from 'axios';
import { getToken, removeToken, removeUser } from '../utils/localStorage';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store logout callback to avoid circular dependency
let logoutCallback = null;

export const setLogoutCallback = (callback) => {
  logoutCallback = callback;
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't handle auth errors for login/signup endpoints
    const isAuthEndpoint = error.config?.url?.includes('/auth/login') || 
                          error.config?.url?.includes('/auth/signup');
    
    // Handle 401 (Unauthorized) - Token expired or invalid
    if (error.response?.status === 401 && !isAuthEndpoint) {
      // Clear local storage
      removeToken();
      removeUser();
      
      // Call logout callback if available
      if (logoutCallback) {
        logoutCallback();
      }
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }
    
    // Handle 403 (Forbidden) - Insufficient permissions
    if (error.response?.status === 403 && !isAuthEndpoint) {
      // Optionally redirect to home or show error
      if (window.location.pathname.startsWith('/admin') || 
          window.location.pathname.startsWith('/owner')) {
        window.location.href = '/';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;