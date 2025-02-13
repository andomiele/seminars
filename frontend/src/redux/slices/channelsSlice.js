import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '1',
  name: 'general',
};

const channelsSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannel: (state, { payload }) => {
      Object.assign(state, {
        ...initialState,
        id: payload.id,
        name: payload.name,
        removable: payload.removable,
      });
    },
  },
});

export const { setChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
