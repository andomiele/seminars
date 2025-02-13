import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'login',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getAuth: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
      }),
    }),
    setUser: builder.mutation({
      query: (user) => ({
        url: 'signup',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const {
  useGetAuthMutation,
  useSetUserMutation,
} = usersApi;
