import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      console.log('authSlice')
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
      state.token = payload.token;
      state.username = payload.username;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
