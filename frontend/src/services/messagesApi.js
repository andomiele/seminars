/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messages',
  tagTypes: ['Messages'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
      keepUnusedDataFor: 1,
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
