import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const location = useLocation();
  const userAuth = useSelector((state) => state.auth.isAuth);
  const loginPage = '/login';

  return userAuth ? <Outlet /> : <Navigate to={loginPage} state={{ from: location }} />;
};

export default PrivateRoute;
