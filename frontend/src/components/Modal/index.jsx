import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../redux/slices/uiSlice';
import { selectIsVisibleModal, selectModalType, selectModalData } from '../../redux/slices/selectorsUi';
import AddChannelModal from '../Channels/AddChannelModal';
import EditChannelModal from '../Channels/EditChannelModal';
import DeleteChannelModal from '../Channels/DeleteChannelModal';

const modals = {
  adding: AddChannelModal,
  removing: DeleteChannelModal,
  editing: EditChannelModal,
};

const BaseModal = () => {
  const isVisible = useSelector(selectIsVisibleModal);
  const modalType = useSelector(selectModalType);
  const modalData = useSelector(selectModalData);
  const dispatch = useDispatch();
  const Component = modals[modalType];

  return (
    isVisible ? (
      <>
        <div className="fade modal-backdrop show" />
        <Modal show centered>
          <Component
            show
            centered
            uiState={modalData}
            hideModal={() => dispatch(hideModal())}
          />
        </Modal>
      </>
    ) : null
  );
};

export default BaseModal;
