/* eslint-disable no-unused-expressions */
/* eslint-disable functional/no-expression-statement */
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ToastContainer as Toaster, Zoom, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AuthPage from './components/Auth/AuthPage.jsx';
import SignupPage from './components/Auth/SignupPage.jsx';
import PublicRoute from './misc/PublicRoute.jsx';
import PrivateRoute from './misc/PrivateRoute.jsx';
import Header from './components/Header/Header.jsx';
import MainPage from './components/Main/MainPage.jsx';
import ErrorPage from './components/NotFound/NotFoundPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const { t } = useTranslation();
  const ui = useSelector((state) => state.ui);

  useEffect(() => {
    ui.error ? toast.error(t(`toasts.${ui.error}`)) : null;
  }, [ui, t]);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainPage />} />
          </Route>
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
    </BrowserRouter>
  );
};
export default App;
