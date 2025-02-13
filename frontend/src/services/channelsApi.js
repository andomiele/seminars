/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channels',
  tagTypes: ['Channels', 'Messages'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
      keepUnusedDataFor: 1,
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
