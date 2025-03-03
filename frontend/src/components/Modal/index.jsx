import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../redux/slices/uiSlice';
import AddChannelModal from '../Channels/AddChannelModal';
import EditChannelModal from '../Channels/EditChannelModal';
import DeleteChannelModal from '../Channels/DeleteChannelModal';

const modals = {
  adding: AddChannelModal,
  removing: DeleteChannelModal,
  editing: EditChannelModal,
};

const renderModal = ({ uiState, handleHideModal }) => {
  if (uiState.modal.isVisible === false) {
    return null;
  }
  const Component = modals[uiState.modal.type];
  return (
    <>
      <div className="fade modal-backdrop show" />
      <Modal show centered>
        <Component
          show
          centered
          uiState={uiState}
          hideModal={handleHideModal}
        />
      </Modal>
    </>
  );
};

const BaseModal = () => {
  const uiState = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleHideModal = () => dispatch(hideModal());

  return (
    renderModal({ uiState, handleHideModal })
  );
};

export default BaseModal;
