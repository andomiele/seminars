import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentChannelId } from '../redux/slices/selectorsUi';
import { prepareHeaders } from './helpers';
import { ROUT_CHANNELS, getRoute } from './apiConfig';

const baseQuery = fetchBaseQuery({
  baseUrl: getRoute(ROUT_CHANNELS),
  prepareHeaders,
});

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery,
  tagTypes: ['Channels', 'Messages'],
  endpoints: (builder) => ({
    getСhannels: builder.query({
      query: () => '',
      keepUnusedDataFor: 1,
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, ...channel }) => ({
        url: id,
        method: 'PATCH',
        body: channel,
      }),
    }),
    deleteChannel: builder.mutation({
      query: ({ id }) => ({
        method: 'DELETE',
        url: id,
        invalidatesTags: ['Channels', 'Messages'],
      }),
    }),
  }),
});

const selectChannels = channelsApi.endpoints.getСhannels.select();

const selectChannelsData = createSelector(
  selectChannels,
  (channelsState) => channelsState.data ?? [],
);

export const selectChannelsNames = createSelector(
  selectChannelsData,
  (channels) => channels.map(({ name }) => name),
);

export const selectCurrentChannel = createSelector(
  [selectChannelsData, selectCurrentChannelId],
  (channels, currentChannelId) => (
    channels.find((channel) => channel.id === currentChannelId) || null
  ),
);

export const {
  useGetСhannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useDeleteChannelMutation,
} = channelsApi;
