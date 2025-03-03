/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { channelsApi } from '../../services/channelsApi';
import { messagesApi } from '../../services/messagesApi';
import { usersApi } from '../../services/authApi';
import { DEFAUL_CHANNEL } from './constants';

const initialState = {
  error: {
    status: null,
  },
  modal: {
    isVisible: false,
    type: null,
    data: null,
  },
  currentChannel: {
    id: DEFAUL_CHANNEL,
  },
};

const clearError = (state) => {
  state.error.status = '';
};

const setError = (state, { payload }) => {
  state.error.status = payload.status || null;
};

const clearErrorEndpoints = [
  channelsApi.endpoints.addChannel.matchPending,
  channelsApi.endpoints.editChannel.matchPending,
  channelsApi.endpoints.deleteChannel.matchPending,
  channelsApi.endpoints.getСhannels.matchPending,
  messagesApi.endpoints.getMessages.matchPending,
  messagesApi.endpoints.addMessage.matchPending,
  usersApi.endpoints.login.matchPending,
  usersApi.endpoints.signup.matchPending,
];

const setErrorEndpoints = [
  channelsApi.endpoints.addChannel.matchRejected,
  channelsApi.endpoints.editChannel.matchRejected,
  channelsApi.endpoints.deleteChannel.matchRejected,
  channelsApi.endpoints.getСhannels.matchRejected,
  messagesApi.endpoints.getMessages.matchRejected,
  messagesApi.endpoints.addMessage.matchRejected,
  usersApi.endpoints.login.matchRejected,
  usersApi.endpoints.signup.matchRejected,
];

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showModalInfo: (state, { payload }) => {
      Object.assign(state.modal, {
        ...initialState.modal,
        isVisible: true,
        type: payload.type,
        data: payload.data,
      });
    },
    hideModal: (state) => {
      Object.assign(state.modal, {
        ...initialState.modal,
        isVisible: false,
        type: null,
        data: null,
      });
    },
    clearError,
    setCurrentChannel: (state, { payload }) => {
      Object.assign(state.currentChannel, {
        ...initialState.currentChannel,
        id: payload.id,
      });
    },
  },
  extraReducers: (builder) => {
    clearErrorEndpoints.forEach((endpoint) => {
      builder.addMatcher(endpoint, clearError);
    });
    setErrorEndpoints.forEach((endpoint) => {
      builder.addMatcher(endpoint, setError);
    });
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, { payload }) => {
        Object.assign(state.currentChannel, {
          id: payload.id,
        });
      },
    );
    builder.addMatcher(
      channelsApi.endpoints.deleteChannel.matchFulfilled,
      (state, { payload }) => {
        if (state.currentChannel.id === payload.id) {
          state.currentChannel.id = DEFAUL_CHANNEL;
        }
      },
    );
  },
});

export const {
  showModalInfo,
  hideModal,
  clearError: clearErrorAction,
  setCurrentChannel,
} = uiSlice.actions;

export default uiSlice.reducer;
