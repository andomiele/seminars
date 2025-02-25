import { configureStore } from '@reduxjs/toolkit';
import authReduser from './slices/authSlice.js';
import uiReduser from './slices/uiSlice.js';
import { channelsApi } from '../services/channelsApi.js';
import { messagesApi } from '../services/messagesApi.js';
import { usersApi } from '../services/authApi.js';

export default configureStore({
  reducer: {
    auth: authReduser,
    ui: uiReduser,

    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware)
    .concat(usersApi.middleware),
});
