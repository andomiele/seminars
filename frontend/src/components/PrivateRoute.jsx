import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import LoginPage from './login/page.jsx';

const PrivatePage = () => {
  const userAuth = useSelector((state) => state.auth);

  return userAuth.token ? <Outlet /> : <Navigate to={<LoginPage />} />;
};

export default PrivatePage;
