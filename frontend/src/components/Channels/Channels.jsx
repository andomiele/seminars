/* eslint-disable functional/no-conditional-statement */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { showModalInfo } from '../../redux/slices/uiSlice';
import { useGetСhannelsQuery } from '../../services/channelsApi.js';
import { setChannel } from '../../redux/slices/channelsSlice.js';
import Spinner from '../Spinner/Spinner.jsx';

const Channels = () => {
  const { data: channels = [], isLoading } = useGetСhannelsQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChanel = useSelector((state) => state.channel);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li className="nav-item w-100" key={channel.id}>
          <div role="group" className="d-flex show dropdown btn-group">
            <button
              type="button"
              className={`btn w-100 rounded-0 text-start text-truncate ${channel.id && channel.id === currentChanel.id ? 'btn-secondary' : ''}`}
              onClick={() => dispatch(setChannel(channel))}
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
                  <Dropdown.Item
                    onClick={() => dispatch(showModalInfo({
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
                    }))}
                  >
                    {t('channelMenu.delete')}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(showModalInfo({
                      isVisible: true,
                      type: 'renaming',
                      data: {
                        title: t('modal.editChannel'),
                        sentBtn: t('modal.sentBtn'),
                        canselBtn: t('modal.canselBtn'),
                        name: channel.name,
                        id: channel.id,
                      },
                    }))}
                  >
                    {t('channelMenu.rename')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Channels;
