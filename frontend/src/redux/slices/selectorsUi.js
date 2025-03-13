import { createSelector } from '@reduxjs/toolkit';

const selectUi = (state) => state.ui;

export const selectModalType = createSelector(selectUi, ((state) => state
  .modal.type));

export const selectModalDescription = createSelector(selectUi, ((state) => state
  .modal.description));

export const selectModalData = createSelector(selectUi, ((state) => state
  .modal.data));

export const selectIsVisibleModal = createSelector(selectUi, ((state) => state
  .modal.isVisible));
