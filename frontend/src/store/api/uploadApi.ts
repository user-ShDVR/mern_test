import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (file) => ({
        url: "/upload",
        method: "POST",
        body: file,
        formData: true,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
