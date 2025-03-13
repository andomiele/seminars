import { configureStore } from '@reduxjs/toolkit';
import { seminarsApi } from '../services/seminarsApi.js';
import uiReduser from './slices/uiSlice.js';

export default configureStore({
  reducer: {
    ui: uiReduser,
    [seminarsApi.reducerPath]: seminarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(seminarsApi.middleware),
});
