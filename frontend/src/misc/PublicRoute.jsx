import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/authSlice.js';
import { PAGE_MAIN, getPage } from '../components/configs/configRouts.js';

const PublicRoute = () => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Navigate to={getPage(PAGE_MAIN)} state={{ from: location }} /> : <Outlet />;
};

export default PublicRoute;
