import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import avatarSignup from '../../assets/avatarSignup.jpg';
import { SignupSchema } from './shema.js';
import { setAuth } from '../../redux/slices/authSlice.js';
import { useSetUserMutation } from '../../services/authApi.js';

const SignupForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [setUser] = useSetUserMutation();

  const handleSubmit = async (values) => {
    await setUser({ username: values.username, password: values.password })
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
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div>
        <img src={avatarSignup} className="rounded-circle" alt="Регистрация" />
      </div>
      <form className="w-50" onSubmit={formik.handleSubmit}>
        <h1 className="text-center mb-4">{t('signupForm.registration')}</h1>
        <div className="form-floating mb-3">
          <input
            placeholder="От 3 до 20 символов"
            name="username"
            autoComplete="username"
            required=""
            id="username"
            className={`form-control ${formik.errors.username || error ? 'is-invalid' : null}`}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="invalid-tooltip">{t(`errors.${formik.errors.username}`)}</div>
          ) : null}
          <label className="form-label" htmlFor="username">{t('signupForm.userName')}</label>
        </div>
        <div className="form-floating mb-3">
          <input
            placeholder="Не менее 6 символов"
            name="password"
            aria-describedby="passwordHelpBlock"
            required=""
            autoComplete="new-password"
            type="password"
            id="password"
            className={`form-control ${formik.errors.password || error ? 'is-invalid' : null}`}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="invalid-tooltip">{t(`errors.${formik.errors.password}`)}</div>
          ) : null}
          <label className="form-label" htmlFor="password">{t('signupForm.password')}</label>
        </div>
        <div className="form-floating mb-4">
          <input
            placeholder="Пароли должны совпадать"
            name="confirmPassword"
            required=""
            autoComplete="new-password"
            type="password"
            id="confirmPassword"
            className={`form-control ${formik.errors.confirmPassword || error ? 'is-invalid' : null}`}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="invalid-tooltip">{t(`errors.${formik.errors.confirmPassword}`)}</div>
          ) : null}
          {status === 409 ? (<div className="invalid-tooltip">{t('errors.error_409')}</div>
          ) : null}
          <label className="form-label" htmlFor="confirmPassword">{t('signupForm.confirmPassword')}</label>
        </div>
        <button type="submit" className="w-100 btn btn-outline-primary">{t('signupForm.signup')}</button>
      </form>
    </>
  );
};

export default SignupForm;
