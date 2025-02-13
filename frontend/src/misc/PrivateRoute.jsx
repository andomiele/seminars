import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router';

const PrivateRoute = () => {
  const location = useLocation();
  const userAuth = localStorage.getItem('token');
  const loginPage = '/login';

  return userAuth ? <Outlet /> : <Navigate to={loginPage} state={{ from: location }} />;
};

export default PrivateRoute;
