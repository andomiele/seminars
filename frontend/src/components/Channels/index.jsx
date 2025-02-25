import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { showModalInfo, addCurrentChannel } from '../../redux/slices/uiSlice.js';
import { useGetСhannelsQuery } from '../../services/channelsApi.js';
import { selectCurrentChannel } from '../../redux/slices/selectorsUi.js';
import Spinner from '../Spinner/Spinner.jsx';

const Channels = () => {
  const { data: channels = [], isLoading } = useGetСhannelsQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChanel = useSelector(selectCurrentChannel);

  if (isLoading) {
    return <Spinner />;
  }

  const setRemovingModalInfo = (channel) => {
    dispatch(showModalInfo({
      isVisible: true,
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

  const setEditingModalInfo = (channel) => {
    dispatch(showModalInfo({
      isVisible: true,
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
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li className="nav-item w-100" key={channel.id}>
          <Container className="d-flex show dropdown btn-group">
            <button
              type="button"
              onClick={() => dispatch(addCurrentChannel(channel))}
              className={`w-100 rounded-0 text-start text-truncate btn ${channel.id && channel.id === currentChanel.id ? 'btn-secondary' : ''}`}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
            {channel.removable ? (
              <Dropdown>
                <Dropdown.Toggle
                  split
                  className="flex-grow-0 rounded-0"
                  variant={channel.id === currentChanel.id ? 'secondary' : ''}
                >
                  <span className="visually-hidden">
                    {t('channelMenu.control')}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setRemovingModalInfo(channel)}>
                    {t('channelMenu.delete')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEditingModalInfo(channel)}>
                    {t('channelMenu.rename')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
          </Container>
        </li>
      ))}
    </ul>
  );
};

export default Channels;
