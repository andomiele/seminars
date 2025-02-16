import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const location = useLocation();
  const userAuth = useSelector((state) => state.auth.isAuth);
  const chatsPage = '/';

  return userAuth ? <Navigate to={chatsPage} state={{ from: location }} /> : <Outlet />;
};

export default PublicRoute;
