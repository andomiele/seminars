/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      localStorage.setItem('token', payload.token);
      localStorage.setItem('username', payload.username);
      Object.assign(state, {
        ...initialState,
        token: payload.token,
        username: payload.username,
      });
    },
  },
});

export const { setAuth } = authSlice.actions;

const selectAuth = (state) => state.auth;

export const selectIsAuth = createSelector(selectAuth, ((auth) => Boolean(auth.token)));
export const selectUsername = createSelector(selectAuth, ((auth) => auth.username));

export default authSlice.reducer;
