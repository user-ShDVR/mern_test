import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IAddTypesRequest,
  IDeleteTypesRequest,
  IEditTypesRequest,
  IGetCertainTypesRequest,
  IGetTypesRequest,
  IGetTypesResponse,
} from "./types";

export const typesApi = createApi({
  reducerPath: "typesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Types"],
  endpoints: (build) => ({
    addTypes: build.mutation<unknown, IAddTypesRequest>({
      query: (body) => ({
        url: "/types",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["Types"],
    }),

    getTypes: build.query<IGetTypesResponse, IGetTypesRequest>({
      query: (body) => ({
        url: "/types",
        params: { page: body.page, limit: body.limit },
      }),
      providesTags: ["Types"],
    }),

    getCertainTypes: build.query<unknown, IGetCertainTypesRequest>({
      query: (body) => ({ url: `/types/${body.id}` }),
      providesTags: ["Types"],
    }),

    editTypes: build.mutation<unknown, IEditTypesRequest>({
      query: (body) => ({
        url: `/types/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
      invalidatesTags: ["Types"],
    }),

    deleteTypes: build.mutation<unknown, IDeleteTypesRequest>({
      query: (body) => ({ url: `/types/${body.id}`, method: "DELETE" }),
      invalidatesTags: ["Types"],
    }),
  }),
});

export const {
  useAddTypesMutation,
  useGetTypesQuery,
  useGetCertainTypesQuery,
  useEditTypesMutation,
  useDeleteTypesMutation,
} = typesApi;
