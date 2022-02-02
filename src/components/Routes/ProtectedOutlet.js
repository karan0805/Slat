import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedOutlet = () => {
  let isAuthenticated = false;
  if (localStorage.getItem('access_token') !== null) {
    isAuthenticated = true;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedOutlet;
