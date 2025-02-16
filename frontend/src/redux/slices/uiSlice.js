/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { channelsApi } from '../../services/channelsApi';
import { messagesApi } from '../../services/messagesApi';
import { usersApi } from '../../services/authApi';

const initialState = {
  error: null,
  modal: {
    isVisible: false,
    type: null,
    data: null,
  },
};

const clearError = (state) => {
  state.error = null;
};

const setError = (state, { payload }) => {
  const error = (payload?.status);
  if (!error) {
    clearError(state);
  }
  if (payload.status === 'FETCH_ERROR' || payload.status === 500) {
    state.error = payload.status;
  }
};

const clearErrorEndpoints = [
  channelsApi.endpoints.addChannel.matchPending,
  channelsApi.endpoints.editChannel.matchPending,
  channelsApi.endpoints.addChannel.matchPending,
  channelsApi.endpoints.getСhannels.matchPending,
  messagesApi.endpoints.getMessages.matchPending,
  messagesApi.endpoints.addMessage.matchPending,
  usersApi.endpoints.getAuth.matchPending,
  usersApi.endpoints.setUser.matchPending,
];

const setErrorEndpoints = [
  channelsApi.endpoints.addChannel.matchRejected,
  channelsApi.endpoints.editChannel.matchRejected,
  channelsApi.endpoints.deleteChannel.matchRejected,
  channelsApi.endpoints.getСhannels.matchRejected,
  messagesApi.endpoints.getMessages.matchRejected,
  messagesApi.endpoints.addMessage.matchRejected,
  usersApi.endpoints.getAuth.matchRejected,
  usersApi.endpoints.setUser.matchRejected,
];

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showModalInfo: (state, { payload }) => {
      Object.assign(state.modal, {
        ...initialState,
        isVisible: true,
        type: payload.type,
        data: payload.data,
      });
    },

    hideModalInfo: (state) => {
      state.modal = initialState.modal;
    },
  },
  extraReducers: (builder) => {
    clearErrorEndpoints.forEach((endpoint) => {
      builder.addMatcher(endpoint, clearError);
    });
    setErrorEndpoints.forEach((endpoint) => {
      builder.addMatcher(endpoint, setError);
    });
  },
});

export const {
  showModalInfo,
  hideModalInfo,
} = uiSlice.actions;

export default uiSlice.reducer;
