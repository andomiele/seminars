/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { usersApi } from '../../services/authApi';

const initialState = {
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
};

const setStorage = (payload) => {
  localStorage.setItem('token', payload.token);
  localStorage.setItem('username', payload.username);
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      setStorage(payload);
      Object.assign(state, {
        ...initialState,
        token: payload.token,
        username: payload.username,
      });
    },
    logout: (state) => {
      Object.assign(state, {
        ...initialState,
        token: '',
        username: '',
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        Object.assign(state, {
          ...initialState,
          token: payload.token,
          username: payload.username,
        });
        setStorage(payload);
      },
    );
    builder.addMatcher(
      usersApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        Object.assign(state, {
          ...initialState,
          token: payload.token,
          username: payload.username,
        });
        setStorage(payload);
      },
    );
  },
});

export const { setAuth, logout } = authSlice.actions;

const selectAuth = (state) => state.auth;

export const selectIsAuth = createSelector(selectAuth, ((auth) => Boolean(auth.token)));
export const selectUsername = createSelector(selectAuth, ((auth) => auth.username));

export default authSlice.reducer;
