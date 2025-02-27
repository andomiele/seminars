import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useAddChannelMutation, selectChannelsNames } from '../../services/channelsApi.js';
import channelSchema from './shema.js';

const AddChannelModal = ({ uiState, hideModal }) => {
  const [addChannel, { isSuccess }] = useAddChannelMutation();
  const { t } = useTranslation();
  const channelsName = useSelector(selectChannelsNames);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (values) => {
    const channelName = leoProfanity.clean(values.name.trim());
    await addChannel({ name: channelName });
    hideModal();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('toasts.сhannelAdded'));
    }
  }, [isSuccess, t]);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: channelSchema(channelsName),
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{uiState.modal.data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              id="name"
              placeholder=""
              className="mb-2 form-control"
              isInvalid={formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputRef}
            />
            <Form.Control.Feedback className="invalid-feedback">
              {t(`errors.${formik.errors.name}`)}
            </Form.Control.Feedback>
            <Form.Label className="visually-hidden" htmlFor="name">{t('modal.channelName')}</Form.Label>
            <Card.Body className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={hideModal}>{uiState.modal.data.canselBtn}</button>
              <button type="submit" className="btn btn-primary">{uiState.modal.data.sentBtn}</button>
            </Card.Body>
          </Form.Group>

        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannelModal;
