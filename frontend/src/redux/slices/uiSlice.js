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
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchPending,
      (state) => {
        state.error = null;
      },
    );
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchRejected,
      (state, { payload }) => {
        state.error = payload.status;
      },
    );
    builder.addMatcher(
      channelsApi.endpoints.editChannel.matchPending,
      (state) => {
        state.error = null;
      },
    );
    builder.addMatcher(
      channelsApi.endpoints.editChannel.matchRejected,
      (state, { payload }) => {
        state.error = payload.status;
      },
    );
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchPending,
      (state) => {
        state.error = null;
      },
    );
    builder.addMatcher(
      channelsApi.endpoints.deleteChannel.matchRejected,
      (state, { payload }) => {
        state.error = payload.status;
      },
    );
    builder.addMatcher(
      channelsApi.endpoints.getСhannels.matchPending,
      (state) => {
        state.error = null;
      },
    );
    builder.addMatcher(
      channelsApi.endpoints.getСhannels.matchRejected,
      (state, { payload }) => {
        state.error = payload.status;
      },
    );

    builder.addMatcher(
      messagesApi.endpoints.getMessages.matchPending,
      (state) => {
        state.error = null;
      },
    );
    builder.addMatcher(
      messagesApi.endpoints.getMessages.matchRejected,
      (state, { payload }) => {
        state.error = payload.status;
      },
    );
    builder.addMatcher(
      messagesApi.endpoints.addMessage.matchPending,
      (state) => {
        state.error = null;
      },
    );
    builder.addMatcher(
      messagesApi.endpoints.addMessage.matchRejected,
      (state, { payload }) => {
        state.error = payload.status;
      },
    );

    builder.addMatcher(
      usersApi.endpoints.getAuth.matchPending,
      (state) => {
        state.error = null;
      },
    );
    builder.addMatcher(
      usersApi.endpoints.getAuth.matchRejected,
      (state, { payload }) => {
        state.error = payload.status;
      },
    );
    builder.addMatcher(
      usersApi.endpoints.setUser.matchPending,
      (state) => {
        state.error = null;
      },
    );
    builder.addMatcher(
      usersApi.endpoints.setUser.matchRejected,
      (state, { payload }) => {
        state.error = payload.status;
      },
    );
  },
});

export const {
  showModalInfo,
  hideModalInfo,
} = uiSlice.actions;

export default uiSlice.reducer;
