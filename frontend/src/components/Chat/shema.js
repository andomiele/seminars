import * as Yup from 'yup';

const messageSchema = Yup.object().shape({
  message: Yup.string()
    .required('required'),
});

export default messageSchema;
