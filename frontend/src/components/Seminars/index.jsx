/* eslint-disable no-unused-expressions */
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Col,
  Card,
  Button,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { showModal, setCurrentSeminar } from '../../redux/slices/uiSlice.js';
import { useGetSeminarsQuery } from '../../services/seminarsApi.js';
import Spinner from '../Spinner/Spinner.jsx';
import img2 from '../../assets/img2.jpg';

const Seminars = () => {
  const { data: seminars = [], isLoading } = useGetSeminarsQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Отображение спиннера в случае долгой загрузки данных
  if (isLoading) {
    return <Spinner />;
  }

  // Замена изображения на случай ошибки загрузки основного
  const img = (image) => {
    if (image) {
      return image;
    }
    return img2;
  };

  // Параметры для модалки удаления
  const showRemovingModal = (seminar) => {
    dispatch(setCurrentSeminar(seminar.id));
    dispatch(showModal({
      type: 'removing',
      description: {
        title: t('modal.deleteSeminar'),
        question: t('modal.confirmation'),
        canselBtn: t('modal.canselBtn'),
        deletelBtn: t('modal.deleteBtn'),
      },
      data: {
        id: seminar.id,
        title: seminar.title,
        description: seminar.description,
        date: seminar.date,
        time: seminar.time,
      },
    }));
  };

  // Параметры для модалки изменения
  const showEditingModal = (seminar) => {
    dispatch(setCurrentSeminar(seminar.id));
    dispatch(showModal({
      type: 'editing',
      description: {
        title: t('modal.editSeminar'),
        sentBtn: t('modal.sentBtn'),
        canselBtn: t('modal.canselBtn'),
      },
      data: {
        id: seminar.id,
        title: seminar.title,
        description: seminar.description,
        date: seminar.date,
        time: seminar.time,
      },
    }));
  };

  return (
    seminars.map((seminar) => (
      <Row className="row-cols-2 g-4" key={seminar.id}>
        <Col className="col-12 m-4">
          <Card className="card h-100">
            <img src={img(seminar.photo)} className="card-img-top" alt={seminar.title} />
            <Card.Body className="card-body">
              <Card.Title className="card-title">{seminar.title}</Card.Title>
              <Card.Text className="card-text">{seminar.description}</Card.Text>
              <Card.Text className="card-text">
                <small className="text-muted">{`Дата: ${seminar.date} Время: ${seminar.time}`}</small>
              </Card.Text>
              <Button className="m-1" onClick={() => showEditingModal(seminar)}>{t('seminarMenu.rename')}</Button>
              <Button className="m-1" onClick={() => showRemovingModal(seminar)}>{t('seminarMenu.delete')}</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    ))
  );
};

export default Seminars;
