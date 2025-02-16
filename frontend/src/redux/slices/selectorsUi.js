import { createSelector } from '@reduxjs/toolkit';

const selector = (state) => state.ui;

const selectError = createSelector(selector, (state) => state.error);

export default selectError;
