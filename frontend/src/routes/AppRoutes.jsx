import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';

import HomePage from '../pages/Home';
import LoginPage from '../pages/Auth/LoginPage';
import SignupPage from '../pages/Auth/SignupPage';
import NotFoundPage from '../pages/NotFound';

import AdminDashboardPage from '../pages/Admin/AdminDashboardPage';
import UserManagementPage from '../pages/Admin/UserManagementPage';
import StoreManagementPage from '../pages/Admin/StoreManagementPage';

import StoreListPage from '../pages/User/StoreListPage';
import MyRatingsPage from '../pages/User/MyRatingsPage';
import ProfilePage from '../pages/User/ProfilePage';

import OwnerDashboardPage from '../pages/StoreOwner/OwnerDashboardPage';

import GuestLayout from '../layouts/GuestLayout';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

// Protected Route Component with auto-logout on auth failure
const ProtectedRoute = ({ children, allowedRoles, requireAuth = true }) => {
  const { isAuthenticated, user, loading, validateToken } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Validate token on route change (silently - don't log out on first check)
    if (requireAuth && isAuthenticated) {
      validateToken(true);
    }
  }, [location.pathname, requireAuth, isAuthenticated, validateToken]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireAuth && allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Guest Route Component - redirects if already authenticated
const GuestRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated && user) {
    // Redirect based on role
    if (user.role === 'System Administrator') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (user.role === 'Store Owner') {
      return <Navigate to="/owner/dashboard" replace />;
    }
    if (user.role === 'Normal User') {
      return <Navigate to="/stores" replace />;
    }
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      
      {/* Guest Routes (Login/Signup) */}
      <Route element={<GuestLayout />}>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignupPage />
            </GuestRoute>
          }
        />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['System Administrator']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="stores" element={<StoreManagementPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Store Owner Routes */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute allowedRoles={['Store Owner']}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<OwnerDashboardPage />} />
      </Route>

      {/* User Routes (Normal User & Store Owner) */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['Normal User', 'Store Owner']}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="stores" element={<StoreListPage />} />
        <Route
          path="my-ratings"
          element={
            <ProtectedRoute allowedRoles={['Normal User']}>
              <MyRatingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
