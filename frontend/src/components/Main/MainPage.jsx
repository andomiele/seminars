/* eslint-disable functional/no-conditional-statement */
import React from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import AddChannelBtn from '../Buttons/AddChannelBtn.jsx';
import Channels from '../Channels/Channels.jsx';
import Chat from '../Chat/index.jsx';
import BaseModal from '../Modal/BaseModal.jsx';

const MainPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userAuth = localStorage.getItem('token');

  return (
    !userAuth ? navigate('/login') : (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <BaseModal />
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('mainePage.channels')}</b>
              <AddChannelBtn />
            </div>
            <Channels />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <Chat />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MainPage;
