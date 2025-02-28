import React, { useRef, useEffect } from 'react';
import { Form, Image, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import avatar from '../../assets/avatar.jpg';
import { authSchema } from './shema.js';
import { useLoginMutation } from '../../services/authApi.js';
import { selectAuthError } from '../../redux/slices/selectorsUi.js';
import { PAGE_MAIN, getPage } from '../configs/configRouts.js';
import { clearErrorAction } from '../../redux/slices/uiSlice.js';

const AuthForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [getAuth] = useLoginMutation();
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);

  const handleSubmit = async (values) => {
    await getAuth(values);
    navigate(getPage(PAGE_MAIN));
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

  const hasValidateErrors = !isEmpty(formik.errors);

  const extraErrors = {
    ...formik.errors,
    ...(!!authError && !hasValidateErrors && { password: authError }),
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
      <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <Image src={avatar} roundedCircle alt="Войти" />
      </Col>
      <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
        <h1 className="text-center mb-4">{t('authForm.login')}</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            type="username"
            id="username"
            placeholder={t('authForm.yourNickname')}
            name="username"
            ref={inputRef}
            className="form-control"
            isInvalid={(formik.touched.username
              && formik.errors.username) || !!authError}
            onChange={handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
          />
          {hasValidateErrors && formik.errors.username && (
            <Form.Control.Feedback type="invalid" tooltip>
              {t(`errors.${extraErrors.username}`)}
            </Form.Control.Feedback>
          )}
          <Form.Label htmlFor="username">{t('authForm.yourNickname')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-4">
          <Form.Control
            type="password"
            id="password"
            placeholder={t('authForm.password')}
            name="password"
            className="form-control"
            isInvalid={(formik.touched.password
              && formik.errors.password) || !!authError}
            onChange={handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {((!!authError && !hasValidateErrors)
          || (hasValidateErrors && formik.errors.password)) && (
            <Form.Control.Feedback type="invalid" tooltip>
              {t(`errors.${extraErrors.password}`)}
            </Form.Control.Feedback>
          )}
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
