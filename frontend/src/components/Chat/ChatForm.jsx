import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useFormik } from 'formik';
import { useAddMessageMutation } from '../../services/messagesApi.js';
import messageSchema from './shema.js';

const ChatForm = ({ channelId, username }) => {
  const [addMessage] = useAddMessageMutation();
  const { t } = useTranslation();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [channelId]);

  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema: messageSchema,
    onSubmit: async (values) => {
      await addMessage({ body: leoProfanity.clean(values.message), channelId, username });
      formik.resetForm();
    },
  });

  return (
    <Form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <Form.Group className="input-group has-validation">
        <Form.Control
          ref={inputRef}
          name="message"
          id="message"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2 form-control"
          value={formik.values.message}
          onChange={formik.handleChange}
        />
        <button
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
          className="btn btn-group-vertical"
        >
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('chat.sent')}</span>
        </button>
      </Form.Group>
    </Form>
  );
};

export default ChatForm;
