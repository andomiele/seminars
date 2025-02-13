import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router';

const PublicRoute = () => {
  const location = useLocation();
  const userAuth = localStorage.getItem('token');
  const chatsPage = '/';

  return userAuth ? <Navigate to={chatsPage} state={{ from: location }} /> : <Outlet />;
};

export default PublicRoute;
