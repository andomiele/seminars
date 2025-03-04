import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useAddMessageMutation } from '../../services/messagesApi.js';
import chatSchema from './shema.js';

const ChatForm = ({ channelId, username }) => {
  const [text, setText] = useState('');
  const [addMessage] = useAddMessageMutation();
  const { t } = useTranslation();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [channelId]);

  const handleAddMessage = (event) => {
    event.preventDefault();
    const newMessage = { body: text, channelId, username };
    addMessage(newMessage);
    setText('');
  };

  const handleInput = (e) => setText(e.target.value);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: chatSchema,
    validateOnBlur: false,
  });

  return (
    <Form noValidate="" className="py-1 border rounded-2" onSubmit={handleAddMessage}>
      <Form.Group className="input-group has-validation">
        <Form.Control
          ref={inputRef}
          name="body"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2 form-control"
          value={text}
          onChange={handleInput}
        />
        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
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
