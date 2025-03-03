import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Channels from '../Channels/index.jsx';
import Chat from '../Chat/index.jsx';
import { selectIsAuth } from '../../redux/slices/authSlice.js';

const MainPage = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  return (
    !isAuth ? navigate('/login') : (
      <Container className="container h-100 my-4 overflow-hidden rounded shadow">
        <Row className="row h-100 bg-white flex-md-row">
          <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <Channels />
          </Col>
          <Col className="col p-0 h-100">
            <Chat />
          </Col>
        </Row>
      </Container>
    )
  );
};

export default MainPage;
