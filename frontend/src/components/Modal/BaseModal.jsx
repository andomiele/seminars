/* eslint-disable functional/no-conditional-statement */
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { hideModalInfo } from '../../redux/slices/uiSlice';
import getModal from './index';

const renderModal = ({ uiState, hideModal }) => {
  if (uiState.modal.isVisible === false) {
    return null;
  }
  const Component = getModal(uiState.modal.type);
  return (
    <>
      <div className="fade modal-backdrop show" />
      <Modal show centered>
        <Component
          show
          centered
          uiState={uiState}
          hideModal={hideModal}
        />
      </Modal>
    </>
  );
};

const BaseModal = () => {
  const uiState = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const hideModal = () => dispatch(hideModalInfo({
    isVisible: false,
    type: null,
    // error: null,
    data: null,
  }));

  return (
    renderModal({ uiState, hideModal })
  );
};

export default BaseModal;
