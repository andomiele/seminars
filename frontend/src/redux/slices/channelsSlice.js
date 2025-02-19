import { createSlice, createSelector } from '@reduxjs/toolkit';

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

const selectChannel = (state) => state.channel;

export const selectCurrentChannel = createSelector(selectChannel, ((channel) => channel));

export default channelsSlice.reducer;
