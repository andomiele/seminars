import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import avatar from '../../assets/avatar.jpg';
import { AuthSchema } from './shema.js';
import { setAuth } from '../../redux/slices/authSlice.js';
import { useGetAuthMutation } from '../../services/authApi.js';

const AuthForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();
  const [getAuth] = useGetAuthMutation();

  const handleSubmit = async (values) => {
    setError(false);
    await getAuth(values)
      .then((response) => {
        if (response.error) {
          setStatus(response.error.status);
        }
        dispatch(setAuth(response.data));
        navigate('/');
      })
      .catch((err) => {
        setError(true);
        console.log(err.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: AuthSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <img src={avatar} className="rounded-circle" alt="Войти" />
      </div>
      <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
        <h1 className="text-center mb-4">{t('authForm.login')}</h1>
        <div className="form-floating mb-3">
          <input
            name="username"
            autoComplete="username"
            required=""
            placeholder="Ваш ник"
            id="username"
            type="username"
            className={`form-control ${formik.errors.username || error ? 'is-invalid' : null}`}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <label htmlFor="username">{t('authForm.yourNickname')}</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="password"
            name="password"
            className={`form-control ${formik.errors.password || error ? 'is-invalid' : null}`}
            autoComplete="current-password"
            required=""
            placeholder="Пароль"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {status === 401 ? (<div className="invalid-tooltip">{t('errors.invalidUsernameOrPassword')}</div>
          ) : null}
          <label className="form-label" htmlFor="password">{t('authForm.password')}</label>
        </div>
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('authForm.login')}</button>
      </form>
    </>
  );
};

export default AuthForm;
