import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IAddImagesRequest, IGetImagesRequest } from "./types";

export const imagesApi = createApi({
  reducerPath: "imagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  endpoints: (build) => ({
    getImages: build.query<IGetImagesRequest[], null>({
      query: () => ({ url: "/images" }),
    }),

    addImages: build.mutation<unknown, IAddImagesRequest>({
      query: (body) => ({
        url: "/images",
        method: "POST",
        body: { ...body },
        formData: true,
      }),
    }),
  }),
});

export const { useGetImagesQuery, useAddImagesMutation } = imagesApi;
