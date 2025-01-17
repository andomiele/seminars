import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'login',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/login' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        method: 'POST',
        body: user,
      }),
    }),
    getСhannels: builder.query({
      query: (token) => token,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetChannelsQuery,
} = usersApi;
