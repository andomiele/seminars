import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const seminarsApi = createApi({
  reducerPath: 'seminarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/seminars' }),
  tagTypes: ['Seminars'],
  endpoints: (builder) => ({
    getSeminars: builder.query({
      query: () => '',
      providesTags: ['Seminars'],
    }),
    editSeminar: builder.mutation({
      query: ({ id, ...seminar }) => ({
        url: id,
        method: 'PATCH',
        body: seminar,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Seminars'],
    }),
    deleteSeminar: builder.mutation({
      query: ({ id }) => ({
        method: 'DELETE',
        url: id,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Seminars'],
    }),
  }),
});

export const {
  useGetSeminarsQuery,
  useEditSeminarMutation,
  useDeleteSeminarMutation,
} = seminarsApi;
