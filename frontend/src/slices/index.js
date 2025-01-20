import { configureStore } from '@reduxjs/toolkit';
import authReduser from './authSlice.js';

export default configureStore({
  reducer: {
    auth: authReduser,
  },
});
