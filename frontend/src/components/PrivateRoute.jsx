import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import MainPage from './MainPage';

const PrivatePage = () => {
  debugger
  const navigate = useNavigate();
  const userAuth = useSelector((state) => console.log(state.auth));

  if (userAuth && userAuth.token) {
    navigate('/')
  }
  if (!userAuth) {
    navigate('/login')
  };
  return {};
};

export default PrivatePage;
