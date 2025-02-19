import { createSelector } from '@reduxjs/toolkit';

const selectUi = (state) => state.ui;

const selectError = createSelector(selectUi, ((state) => state.error));

export const selectToastsError = createSelector(selectError, (error) => (
  error.status !== 401 && error.status !== 409 ? error.status : null));

export const selectAuthError = createSelector(selectError, (error) => (
  error.status === 401 || error.status === 409 ? error.status : null));
