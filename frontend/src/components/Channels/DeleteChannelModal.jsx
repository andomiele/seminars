import React, { useEffect } from 'react';
import { Modal, Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDeleteChannelMutation } from '../../services/channelsApi.js';

const DeleteChannelModal = ({ uiState, hideModal }) => {
  const [deleteChannel, { isSuccess }] = useDeleteChannelMutation();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    await deleteChannel({ id: uiState.id });
    hideModal();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('toasts.channelDeteted'));
    }
  }, [isSuccess, t]);

  const formik = useFormik({
    initialValues: { name: uiState.name },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{uiState.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="" onSubmit={formik.handleSubmit}>
          <Form.Group>
            <p className="lead">{uiState.question}</p>
            <Card.Body className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={hideModal}>{uiState.canselBtn}</button>
              <button type="submit" className="btn btn-danger">{uiState.deletelBtn}</button>
            </Card.Body>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default DeleteChannelModal;
