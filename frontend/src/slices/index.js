import { configureStore } from '@reduxjs/toolkit';
import authReduser from './authSlice.js';
import channelsReduser from './channelsSlice.js';

export default configureStore({
  reducer: {
    auth: authReduser,
    channels: channelsReduser,
  },
});
