import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'login',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (login) => ({
        method: 'POST',
        body: login,
      }),
    }),
    getСhannels: builder.query({
      query: (channels) => channels,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetChannelsQuery,
} = usersApi;
