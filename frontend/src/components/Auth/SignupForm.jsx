import React, { useRef, useEffect } from 'react';
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

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
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
            name="username"
            required
            placeholder={t('signUpForm.username')}
            onChange={formik.handleChange}
            value={formik.values.username}
            ref={inputRef}
            isInvalid={(formik.touched.username
              && formik.errors.username) || !!authError}
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {t(`errors.${extraErrors.password}`)}
          </Form.Control.Feedback>
          <Form.Label>{t('signupForm.userName')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            type="password"
            name="password"
            required
            placeholder={t('loginForm.password')}
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={(formik.touched.password
              && formik.errors.password) || !!authError}
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {t(`errors.${extraErrors.password}`)}
          </Form.Control.Feedback>
          <Form.Label>{t('signupForm.password')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            type="password"
            name="confirmPassword"
            required
            placeholder={t('signUpForm.confirmPassword')}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            isInvalid={(formik.touched.confirmPassword
            && formik.errors.confirmPassword) || !!authError}
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type="invalid" tooltip>
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
