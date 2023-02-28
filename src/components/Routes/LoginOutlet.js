import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const LoginOutlet = () => {
  let isAuthenticated = true;
  if (localStorage.getItem('access_token') == null) {
    isAuthenticated = false;
  }
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default LoginOutlet;
