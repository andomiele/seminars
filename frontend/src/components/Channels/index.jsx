import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';
import { showModal, setCurrentChannel } from '../../redux/slices/uiSlice.js';
import { useGetСhannelsQuery } from '../../services/channelsApi.js';
import { selectCurrentChannelId } from '../../redux/slices/selectorsUi.js';
import Spinner from '../Spinner/Spinner.jsx';

const Channels = () => {
  const { data: channels = [], isLoading } = useGetСhannelsQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChanel = useSelector(selectCurrentChannelId);

  if (isLoading) {
    return <Spinner />;
  }

  const showAddModal = () => {
    dispatch(showModal({
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

  const showRemovingModal = (channel) => {
    dispatch(showModal({
      type: 'removing',
      data: {
        title: t('modal.deleteChannel'),
        question: t('modal.confirmation'),
        canselBtn: t('modal.canselBtn'),
        deletelBtn: t('modal.deleteBtn'),
        name: channel.name,
        id: channel.id,
      },
    }));
  };

  const showEditingModal = (channel) => {
    dispatch(showModal({
      type: 'editing',
      data: {
        title: t('modal.editChannel'),
        sentBtn: t('modal.sentBtn'),
        canselBtn: t('modal.canselBtn'),
        name: channel.name,
        id: channel.id,
      },
    }));
  };

  return (
    <>
      <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('mainPage.channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => showAddModal()}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">{t('mainPage.plus')}</span>
        </button>
      </Container>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <div className="d-flex show dropdown btn-group">
              <button
                type="button"
                onClick={() => dispatch(setCurrentChannel(channel))}
                className={`w-100 rounded-0 text-start text-truncate btn ${channel.id && channel.id === currentChanel ? 'btn-secondary' : ''}`}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
              {channel.removable ? (
                <Dropdown>
                  <Dropdown.Toggle
                    split
                    className="flex-grow-0 rounded-0"
                    variant={channel.id === currentChanel ? 'secondary' : ''}
                  >
                    <span className="visually-hidden">
                      {t('channelMenu.control')}
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => showRemovingModal(channel)}>
                      {t('channelMenu.delete')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => showEditingModal(channel)}>
                      {t('channelMenu.rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Channels;
