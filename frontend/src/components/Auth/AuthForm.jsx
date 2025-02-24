import React, { useRef, useEffect } from 'react';
import { Form, Image, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import avatar from '../../assets/avatar.jpg';
import { authSchema } from './shema.js';
import { setAuth } from '../../redux/slices/authSlice.js';
import { useLoginMutation } from '../../services/authApi.js';
import { clearErrorAction } from '../../redux/slices/uiSlice.js';
import { selectAuthError } from '../../redux/slices/selectorsUi.js';

const AuthForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [getAuth] = useLoginMutation();
  const authError = useSelector(selectAuthError);

  const handleSubmit = async (values) => {
    await getAuth(values)
      .then((response) => {
        dispatch(clearErrorAction);
        dispatch(setAuth({
          username: response.data.username,
          token: response.data.token,
        }));
        navigate('/');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: authSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <Image src={avatar} roundedCircle alt="Войти" />
      </Col>
      <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
        <h1 className="text-center mb-4">{t('authForm.login')}</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            type="username"
            id="username"
            placeholder="Ваш ник"
            name="username"
            ref={inputRef}
            className="form-control"
            isInvalid={!!authError}
            onChange={formik.handleChange}
            value={formik.values.username}
            required
          />
          <Form.Label htmlFor="username">{t('authForm.yourNickname')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-4">
          <Form.Control
            type="password"
            id="password"
            placeholder="Пароль"
            name="password"
            className="form-control"
            isInvalid={!!authError}
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
          <Form.Control.Feedback className="invalid-tooltip">
            {t(`errors.${authError}`)}
          </Form.Control.Feedback>
          <Form.Label htmlFor="password">{t('authForm.password')}</Form.Label>
        </Form.Group>
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
          {t('authForm.login')}
        </button>
      </Form>
    </>
  );
};

export default AuthForm;
