import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../redux/slices/uiSlice';
import {
  selectIsVisibleModal,
  selectModalType,
  selectModalData,
  selectModalDescription,
} from '../../redux/slices/selectorsUi';
import EditSeminarModal from '../Seminars/EditSeminarModal';
import DeleteSeminarModal from '../Seminars/DeleteSeminarModal';

const modals = {
  removing: DeleteSeminarModal,
  editing: EditSeminarModal,
};

const BaseModal = () => {
  const isVisible = useSelector(selectIsVisibleModal);
  const modalType = useSelector(selectModalType);
  const modalData = useSelector(selectModalData);
  const modalDescription = useSelector(selectModalDescription);

  const dispatch = useDispatch();
  const Component = modals[modalType];

  return (
    isVisible ? (
      <Modal show centered>
        <Component
          show
          centered
          uiState={modalData}
          modalDescription={modalDescription}
          hideModal={() => dispatch(hideModal())}
        />
      </Modal>
    ) : null
  );
};

export default BaseModal;
