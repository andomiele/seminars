import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/authSlice.js';

const PublicRoute = () => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);
  const chatsPage = '/';

  return isAuth ? <Navigate to={chatsPage} state={{ from: location }} /> : <Outlet />;
};

export default PublicRoute;
