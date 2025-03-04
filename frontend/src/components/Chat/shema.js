import * as Yup from 'yup';

const chatSchema = () => Yup.object().shape({
  text: Yup.string().min(1).equired('required'),
});

export default chatSchema;
