import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './prepareHeaders';
import { ROUT_CHANNELS, getRoute } from './apiConfig';

const baseQuery = fetchBaseQuery({
  baseUrl: getRoute(ROUT_CHANNELS),
  prepareHeaders,
});

export const channelsApi = createApi({
  reducerPath: 'channels',
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
      keepUnusedDataFor: 1,
      invalidatesTags: ['Channels'],
    }),
    editChannel: builder.mutation({
      query: ({ id, ...channel }) => ({
        url: id,
        method: 'PATCH',
        body: channel,
      }),
      keepUnusedDataFor: 1,
      invalidatesTags: ['Channels'],
    }),
    deleteChannel: builder.mutation({
      query: ({ id }) => ({
        method: 'DELETE',
        url: id,
      }),
      invalidatesTags: ['Channels', 'Messages'],
    }),
  }),
});

export const {
  useGetСhannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useDeleteChannelMutation,
} = channelsApi;
