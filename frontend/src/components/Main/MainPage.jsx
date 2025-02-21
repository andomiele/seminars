import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AddChannelBtn from '../Buttons/AddChannelBtn.jsx';
import Channels from '../Channels/Channels.jsx';
import Chat from '../Chat/index.jsx';
import BaseModal from '../Modal/BaseModal.jsx';
import { selectIsAuth } from '../../redux/slices/authSlice.js';

const MainPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuth = useSelector(selectIsAuth);

  return (
    !isAuth ? navigate('/login') : (
      <Container className="container h-100 my-4 overflow-hidden rounded shadow">
        <BaseModal />
        <Row className="row h-100 bg-white flex-md-row">
          <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('mainPage.channels')}</b>
              <AddChannelBtn />
            </div>
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
