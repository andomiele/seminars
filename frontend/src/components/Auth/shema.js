import * as Yup from 'yup';

export const AuthSchema = Yup.object({
  username: Yup.string()
    .required('required'),
  password: Yup.string()
    .required('required'),
});

export const SignupSchema = Yup.object({
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
