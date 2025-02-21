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
        dispatch(setAuth({
          username: response.data.username,
          token: response.data.token,
        }));
        dispatch(clearErrorAction());
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
      <Col>
        <Image src={avatarSignup} roundedCircle alt="Регистрация" />
      </Col>
      <Form className="w-50" onSubmit={formik.handleSubmit}>
        <h1 className="text-center mb-4">{t('signupForm.registration')}</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            name="username"
            type="username"
            id="username"
            required
            placeholder={t('signUpForm.username')}
            onChange={formik.handleChange}
            value={formik.values.username}
            ref={inputRef}
            isInvalid={(formik.touched.username
              && formik.errors.username) || !!authError}
            onBlur={formik.handleBlur}
          />
          {!authError && (
            <Form.Control.Feedback type="invalid" tooltip>
              {t(`errors.${extraErrors.username}`)}
            </Form.Control.Feedback>
          )}
          <Form.Label htmlFor="username">{t('signupForm.userName')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            type="password"
            name="password"
            id="password"
            required
            placeholder={t('loginForm.password')}
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={(formik.touched.password
              && formik.errors.password) || !!authError}
            onBlur={formik.handleBlur}
          />
          {!authError && (
            <Form.Control.Feedback type="invalid" tooltip>
              {t(`errors.${extraErrors.password}`)}
            </Form.Control.Feedback>
          )}
          <Form.Label htmlFor="password">{t('signupForm.password')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-4">
          <Form.Control
            type="password"
            name="confirmPassword"
            id="confirmPassword"
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
          <Form.Label htmlFor="confirmPassword">{t('signupForm.confirmPassword')}</Form.Label>
        </Form.Group>
        <button type="submit" className="w-100 btn btn-outline-primary">
          {t('signupForm.signup')}
        </button>
      </Form>
    </>
  );
};

export default SignupForm;
