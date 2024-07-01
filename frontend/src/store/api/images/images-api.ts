import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IDeleteImagesRequest,
  TGetImagesRequest,
  IGetImagesResponse,
  TDeleteImagesResponse,
} from "./types";

export const imagesApi = createApi({
  reducerPath: "imagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Images"],
  endpoints: (build) => ({
    getImages: build.query<IGetImagesResponse, TGetImagesRequest>({
      query: () => ({ url: "/images" }),
      providesTags: ["Images"],
    }),

    deleteImages: build.mutation<TDeleteImagesResponse, IDeleteImagesRequest>({
      query: (body) => ({
        url: `/images/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Images"],
    }),
  }),
});

export const { useGetImagesQuery, useDeleteImagesMutation } = imagesApi;
