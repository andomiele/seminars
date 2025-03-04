import { createSelector } from '@reduxjs/toolkit';
import { UNAUTHORIZED_ERROR, CONFLICT_ERROR } from './constants.js';

const selectUi = (state) => state.ui;

const selectError = createSelector(selectUi, ((state) => state.error));

export const selectCurrentChannelId = createSelector(selectUi, ((state) => state
  .currentChannel.id));

export const selectModalType = createSelector(selectUi, ((state) => state
  .modal.type));

export const selectModalData = createSelector(selectUi, ((state) => state
  .modal.data));

export const selectIsVisibleModal = createSelector(selectUi, ((state) => state
  .modal.isVisible));

export const selectToastsError = createSelector(selectError, (error) => (
  error.status !== UNAUTHORIZED_ERROR && error.status !== CONFLICT_ERROR ? error.status : null));

export const selectAuthError = createSelector(selectError, (error) => (
  error.status === UNAUTHORIZED_ERROR || error.status === CONFLICT_ERROR ? error.status : null));
