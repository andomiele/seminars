import React, { useEffect, useRef } from 'react';
import { Modal, Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useEditSeminarMutation } from '../../services/seminarsApi.js';

const EditSeminarModal = ({ uiState, modalDescription, hideModal }) => {
  const [editChannel] = useEditSeminarMutation();
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const handleSubmit = async (values) => {
    await editChannel(values);
    hideModal();
  };

  const formik = useFormik({
    initialValues: {
      id: uiState.id,
      title: uiState.title,
      description: uiState.description,
      date: uiState.date,
      time: uiState.time,
    },
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
            <Form.Label htmlFor="title">{t('modal.title')}</Form.Label>
            <Form.Control
              name="title"
              id="title"
              placeholder=""
              className="mb-2 form-control"
              value={formik.values.title}
              onChange={formik.handleChange}
              ref={inputRef}
            />
            <Form.Label htmlFor="description">{t('modal.description')}</Form.Label>
            <Form.Control
              name="description"
              id="description"
              placeholder=""
              className="mb-2 form-control"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <Form.Label htmlFor="date">{t('modal.date')}</Form.Label>
            <Form.Control
              name="date"
              id="date"
              placeholder=""
              className="mb-2 form-control"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
            <Form.Label htmlFor="time">{t('modal.time')}</Form.Label>
            <Form.Control
              name="time"
              id="time"
              placeholder=""
              className="mb-2 form-control"
              value={formik.values.time}
              onChange={formik.handleChange}
            />
            <Card.Body className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={hideModal}>{modalDescription.canselBtn}</button>
              <button type="submit" className="btn btn-primary">{modalDescription.sentBtn}</button>
            </Card.Body>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default EditSeminarModal;
