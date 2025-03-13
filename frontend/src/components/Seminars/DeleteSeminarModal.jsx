import React from 'react';
import { Modal, Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDeleteSeminarMutation } from '../../services/seminarsApi.js';

const DeleteSeminarModal = ({ uiState, modalDescription, hideModal }) => {
  const [deleteSeminar] = useDeleteSeminarMutation();

  const handleSubmit = async () => {
    await deleteSeminar({ id: uiState.id });
    hideModal();
  };

  const formik = useFormik({
    initialValues: { name: uiState.name },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{modalDescription.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="" onSubmit={formik.handleSubmit}>
          <Form.Group>
            <p className="lead">{modalDescription.question}</p>
            <Card.Body className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={hideModal}>{modalDescription.canselBtn}</button>
              <button type="submit" className="btn btn-danger">{modalDescription.deletelBtn}</button>
            </Card.Body>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default DeleteSeminarModal;
