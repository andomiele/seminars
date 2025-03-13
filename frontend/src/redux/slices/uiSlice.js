/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    isVisible: false,
    type: null,
    data: null,
    description: null,
  },
  currentSeminar: {
    id: '',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      Object.assign(state.modal, {
        ...initialState.modal,
        isVisible: true,
        type: payload.type,
        data: payload.data,
        description: payload.description,
      });
    },
    hideModal: (state) => {
      Object.assign(state.modal, {
        ...initialState.modal,
        isVisible: false,
        type: null,
        data: null,
        description: null,
      });
    },
    setCurrentSeminar: (state, { payload }) => {
      Object.assign(state.currentSeminar, {
        ...initialState.currentSeminar,
        id: payload.id,
      });
    },
  },
});

export const {
  showModal,
  hideModal,
  setCurrentSeminar,
} = uiSlice.actions;

export default uiSlice.reducer;
