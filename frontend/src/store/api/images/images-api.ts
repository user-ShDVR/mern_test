import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IAddImagesRequest,
  IDeleteImagesRequest,
  IGetImagesResponse,
} from "./types";

export const imagesApi = createApi({
  reducerPath: "imagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Images"],
  endpoints: (build) => ({
    getImages: build.query<IGetImagesResponse, unknown>({
      query: () => ({ url: "/images" }),
      providesTags: ["Images"],
    }),

    addImages: build.mutation<unknown, IAddImagesRequest>({
      query: (body) => ({
        url: "/images",
        method: "POST",
        body: { ...body },
        formData: true,
      }),
      invalidatesTags: ["Images"],
    }),

    deleteImages: build.mutation<unknown, IDeleteImagesRequest>({
      query: (body) => ({
        url: `/images/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Images"],
    }),
  }),
});

export const {
  useGetImagesQuery,
  useAddImagesMutation,
  useDeleteImagesMutation,
} = imagesApi;
