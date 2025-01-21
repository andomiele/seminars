/* eslint-disable functional/no-expression-statement */
import { createSlice } from '@reduxjs/toolkit';

const initialState = [{ id: '1', name: 'general', removable: false }];

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = { ...initialState, payload };
    },
  },
});

export const { setChannels } = channelsSlice.actions;
export default channelsSlice.reducer;
