import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Auth Components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

// Main App Components
import Welcome from './pages/Welcome';
import RegistrationForm from './pages/RegistrationForm';
import Confirmation from './pages/Confirmation';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import VideoCall from './pages/VideoCall';
import ScheduleCall from './pages/ScheduleCall';
import ResourcesPage from './pages/ResourcesPage';
import NotFound from './pages/NotFound';

// Layout Components
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ProfileProvider>
          <NotificationProvider>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Welcome />} />
              
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
              </Route>
              
              {/* Protected Routes */}
              <Route element={<MainLayout />}>
                <Route path="/registration" element={
                  <ProtectedRoute>
                    <RegistrationForm />
                  </ProtectedRoute>
                } />
                <Route path="/confirmation" element={
                  <ProtectedRoute>
                    <Confirmation />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/edit-profile" element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                } />
                <Route path="/video-call/:id" element={
                  <ProtectedRoute>
                    <VideoCall />
                  </ProtectedRoute>
                } />
                <Route path="/schedule-call" element={
                  <ProtectedRoute>
                    <ScheduleCall />
                  </ProtectedRoute>
                } />
                <Route path="/resources" element={
                  <ProtectedRoute>
                    <ResourcesPage />
                  </ProtectedRoute>
                } />
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NotificationProvider>
        </ProfileProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
