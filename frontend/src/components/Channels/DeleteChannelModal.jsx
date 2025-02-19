import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDeleteChannelMutation, useGetСhannelsQuery } from '../../services/channelsApi.js';
import { setChannel } from '../../redux/slices/channelsSlice.js';

const DeleteChannelModal = ({ uiState, hideModal }) => {
  const [deleteChannel, { isSuccess }] = useDeleteChannelMutation();
  const { data: channels = [] } = useGetСhannelsQuery();
  const defaultChannel = channels.find((channel) => channel.id === '1');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    await deleteChannel({ id: uiState.modal.data.id })
      .then(() => {
        dispatch(setChannel(defaultChannel));
        hideModal();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('toasts.channelDeteted'));
    }
  }, [isSuccess, t]);

  const formik = useFormik({
    initialValues: { name: uiState.modal.data.name },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{uiState.modal.data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="" onSubmit={formik.handleSubmit}>
          <Form.Group>
            <p className="lead">{uiState.modal.data.question}</p>
            <Card.Body className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={hideModal}>{uiState.modal.data.canselBtn}</button>
              <button type="submit" className="btn btn-danger">{uiState.modal.data.deletelBtn}</button>
            </Card.Body>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default DeleteChannelModal;
