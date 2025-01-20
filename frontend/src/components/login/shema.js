import * as Yup from 'yup';

const SignupSchema = Yup.object({
  username: Yup.string()
    .min(4, 'Минимум 4 буквы')
    .max(20, 'Максимум 20 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(4, 'Минимум 4 буквы')
    .max(20, 'Максимум 20 букв')
    .required('Обязательное поле'),
});

export default SignupSchema;
