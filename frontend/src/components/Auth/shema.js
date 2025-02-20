import * as Yup from 'yup';

export const authSchema = Yup.object().shape({
  username: Yup.string()
    .required('required'),
  password: Yup.string()
    .required('required'),
});

export const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'symbolRange')
    .max(20, 'max')
    .required('required'),
  password: Yup.string()
    .min(6, 'sixSymbols')
    .max(20, 'max')
    .required('required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'confirm')
    .required('required'),
});
