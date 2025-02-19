import React from 'react';
import { Form, Image, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import avatarSignup from '../../assets/avatarSignup.jpg';
import { signupSchema } from './shema.js';
import { setAuth } from '../../redux/slices/authSlice.js';
import { useSetUserMutation } from '../../services/authApi.js';
import { clearErrorAction } from '../../redux/slices/uiSlice.js';
import { selectAuthError } from '../../redux/slices/selectorsUi.js';

const SignupForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [setUser] = useSetUserMutation();
  const authError = useSelector(selectAuthError);

  const handleSubmit = async (values) => {
    await setUser(values)
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

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const extraErrors = {
    ...formik.errors,
    ...(!!authError && { confirmPassword: authError }),
  };

  return (
    <>
      <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <Image src={avatarSignup} roundedCircle alt="Регистрация" />
      </Col>
      <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
        <h1 className="text-center mb-4">{t('signupForm.registration')}</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            type="username"
            placeholder="От 3 до 20 символов"
            name="username"
            className="form-control"
            isInvalid={formik.errors.username || !!authError}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {!authError && (
            <Form.Control.Feedback className="invalid-tooltip">
              {t(`errors.${extraErrors.username}`)}
            </Form.Control.Feedback>
          )}
          <Form.Label>{t('signupForm.userName')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            type="password"
            placeholder="Не менее 6 символов"
            name="password"
            className="form-control"
            isInvalid={formik.errors.password || !!authError}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {!authError && (
            <Form.Control.Feedback className="invalid-tooltip">
              {t(`errors.${extraErrors.password}`)}
            </Form.Control.Feedback>
          )}
          <Form.Label>{t('signupForm.password')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            type="password"
            placeholder="Пароли должны совпадать"
            name="confirmPassword"
            className="form-control"
            isInvalid={formik.errors.confirmPassword || !!authError}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          <Form.Control.Feedback className="invalid-tooltip">
            {t(`errors.${extraErrors.confirmPassword}`)}
          </Form.Control.Feedback>
          <Form.Label>{t('signupForm.confirmPassword')}</Form.Label>
        </Form.Group>
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
          {t('signupForm.signup')}
        </button>
      </Form>
    </>
  );
};

export default SignupForm;
