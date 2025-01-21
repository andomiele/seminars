/* eslint-disable functional/no-expression-statement */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import SignupSchema from './shema.js';
import { setAuth } from '../../slices/authSlice.js';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    await axios.post('/api/v1/login', values)
      .then((response) => {
        dispatch(setAuth(response.data));
        navigate('/');
      })
      .catch((err) => {
        setError(true);
        navigate('/login');
        console.log(err.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required=""
          placeholder="Ваш ник"
          id="username"
          type="username"
          className={`form-control ${error ? 'is-invalid' : null}`}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}

        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input
          type="password"
          name="password"
          className={`form-control ${error ? 'is-invalid' : null}`}
          autoComplete="current-password"
          required=""
          placeholder="Пароль"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <label className="form-label" htmlFor="password">Пароль</label>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
  );
};

export default LoginForm;
