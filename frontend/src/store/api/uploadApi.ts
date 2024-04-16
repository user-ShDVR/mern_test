import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "http://localhost:4444";

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (file) => ({
        url: '/upload',
        method: 'POST',
        body: file,
        formData: true,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;