import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/authSlice.js';

const PrivateRoute = () => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);
  const loginPage = '/login';

  return isAuth ? <Outlet /> : <Navigate to={loginPage} state={{ from: location }} />;
};

export default PrivateRoute;
