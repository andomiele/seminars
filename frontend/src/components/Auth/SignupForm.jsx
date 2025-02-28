import React, { useRef, useEffect } from 'react';
import { Form, Image, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { useNavigate } from 'react-router';
import avatarSignup from '../../assets/avatarSignup.jpg';
import { signupSchema } from './shema.js';
import { useSignupMutation } from '../../services/authApi.js';
import { selectAuthError } from '../../redux/slices/selectorsUi.js';
import { clearErrorAction } from '../../redux/slices/uiSlice.js';
import { PAGE_MAIN, getPage } from '../configs/configRouts.js';

const SignupForm = () => {
  const { t } = useTranslation();
  const [setUser, { isSuccess }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector(selectAuthError);

  const handleSubmit = async (values) => {
    await setUser(values);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(getPage(PAGE_MAIN));
    }
  }, [isSuccess, navigate]);

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

  const hasValidateErrors = !isEmpty(formik.errors);

  const extraErrors = {
    ...formik.errors,
    ...(!!authError && !hasValidateErrors && { confirmPassword: authError }),
  };

  const handleChange = (event) => {
    formik.handleChange(event);
    if (!authError) {
      return;
    }
    dispatch(clearErrorAction());
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
            onChange={handleChange}
            value={formik.values.username}
            ref={inputRef}
            isInvalid={(formik.touched.username
              && formik.errors.username) || !!authError}
            onBlur={formik.handleBlur}
          />
          {hasValidateErrors && formik.errors.username && (
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
            placeholder={t('signupForm.password')}
            onChange={handleChange}
            value={formik.values.password}
            isInvalid={(formik.touched.password
              && formik.errors.password) || !!authError}
            onBlur={formik.handleBlur}
          />
          {hasValidateErrors && formik.errors.password && (
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
            onChange={handleChange}
            value={formik.values.confirmPassword}
            isInvalid={(formik.touched.confirmPassword
            && formik.errors.confirmPassword) || !!authError}
            onBlur={formik.handleBlur}
          />
          {((!!authError && !hasValidateErrors)
          || (hasValidateErrors && formik.errors.confirmPassword)) && (
            <Form.Control.Feedback type="invalid" tooltip>
              {t(`errors.${extraErrors.confirmPassword}`)}
            </Form.Control.Feedback>
          )}
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
