import React from 'react';
import { PlusSquare } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { showModalInfo } from '../../redux/slices/uiSlice';

const AddChannelBtn = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="p-0 text-primary btn btn-group-vertical"
      onClick={() => dispatch(showModalInfo({
        isVisible: true,
        type: 'adding',
        data: {
          title: t('modal.addChannel'),
          sentBtn: t('modal.sentBtn'),
          canselBtn: t('modal.canselBtn'),
          name: null,
          id: null,
        },
      }))}
    >
      <PlusSquare size={20} />
      <span className="visually-hidden">{t('mainPage.plus')}</span>
    </button>
  );
};

export default AddChannelBtn;
