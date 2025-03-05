import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ToastContainer as Toaster, Zoom, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import BaseModal from './components/Modal';
import AuthPage from './components/Auth/AuthPage.jsx';
import SignupPage from './components/Auth/SignupPage.jsx';
import PublicRoute from './misc/PublicRoute.jsx';
import PrivateRoute from './misc/PrivateRoute.jsx';
import Header from './components/Header';
import Main from './components/Main';
import ErrorPage from './components/NotFound/NotFoundPage.jsx';
import { selectToastsError } from './redux/slices/selectorsUi.js';
import {
  PAGE_MAIN,
  PAGE_LOGIN,
  PAGE_SIGNUP,
  PAGE_NOT_FOUND,
  getPage,
} from './components/configs/configRouts.js';

const App = () => {
  const { t } = useTranslation();
  const error = useSelector(selectToastsError);

  useEffect(() => {
    if (error) {
      toast.error(t(`toasts.${error}`));
    }
  }, [error, t]);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={getPage(PAGE_LOGIN)} element={<AuthPage />} />
            <Route path={getPage(PAGE_SIGNUP)} element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path={getPage(PAGE_MAIN)} element={<Main />} />
          </Route>
          <Route path={getPage(PAGE_NOT_FOUND)} element={<ErrorPage />} />
        </Routes>
      </div>
      <Toaster
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
      <BaseModal />
    </BrowserRouter>
  );
};
export default App;
