import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './helpers';
import { ROUT_MESSAGES, getRoute } from './apiConfig';

const baseQuery = fetchBaseQuery({
  baseUrl: getRoute(ROUT_MESSAGES),
  prepareHeaders,
});

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery,
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      keepUnusedDataFor: 1,
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (body) => ({
        method: 'POST',
        body,
      }),
      providesTags: ['Messages'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
