import * as Yup from 'yup';

const channelSchema = (channelsList) => Yup.object({
  name: Yup.string()
    .min(3, 'symbolRange')
    .max(20, 'symbolRange')
    .required('required')
    .notOneOf(channelsList, 'unic'),
});

export default channelSchema;
