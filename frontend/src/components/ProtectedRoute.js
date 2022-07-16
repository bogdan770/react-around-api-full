import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children, isRegistered }) => {
  const location = useLocation();
  return isRegistered ? (
    children
  ) : (
    <Navigate to="signin" replace state={{ from: location.pathname }} />
  );
};