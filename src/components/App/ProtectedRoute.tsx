import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem('username') !== null;

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
