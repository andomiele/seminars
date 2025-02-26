import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/authSlice.js';
import { PAGE_LOGIN, getPage } from '../components/configs/configRouts.js';

const PrivateRoute = () => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Outlet /> : <Navigate to={getPage(PAGE_LOGIN)} state={{ from: location }} />;
};

export default PrivateRoute;
