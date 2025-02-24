import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { showModalInfo } from '../../redux/slices/uiSlice.js';
import Channels from '../Channels/index.jsx';
import Chat from '../Chat/index.jsx';
import BaseModal from '../Modal/BaseModal.jsx';
import { selectIsAuth } from '../../redux/slices/authSlice.js';

const MainPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const setAddModalInfo = () => {
    dispatch(showModalInfo({
      isVisible: true,
      type: 'adding',
      data: {
        title: t('modal.addChannel'),
        sentBtn: t('modal.sentBtn'),
        canselBtn: t('modal.canselBtn'),
        name: null,
        id: null,
      },
    }));
  };

  return (
    !isAuth ? navigate('/login') : (
      <Container className="container h-100 my-4 overflow-hidden rounded shadow">
        <BaseModal />
        <Row className="row h-100 bg-white flex-md-row">
          <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('mainPage.channels')}</b>
              <button
                type="button"
                className="p-0 text-primary btn btn-group-vertical"
                onClick={() => setAddModalInfo()}
              >
                <PlusSquare size={20} />
                <span className="visually-hidden">{t('mainPage.plus')}</span>
              </button>
            </Container>
            <Channels />
          </Col>
          <Col className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <Chat />
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default MainPage;
