import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IAddTypesRequest,
  IDeleteTypesRequest,
  IEditTypesRequest,
  IGetCertainTypesRequest,
  IGetTypesRequest,
  IGetTypesResponse,
  TAddTypesResponse,
  TDeleteTypesResponse,
  TEditTypesResponse,
  TGetCertainTypesResponse,
} from "./types";

export const typesApi = createApi({
  reducerPath: "typesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Types"],
  endpoints: (build) => ({
    addTypes: build.mutation<TAddTypesResponse, IAddTypesRequest>({
      query: (body) => ({
        url: "/types",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Types"],
    }),

    getTypes: build.query<IGetTypesResponse, IGetTypesRequest>({
      query: (body) => ({
        url: `/types?page=${body.page}&limit=${body.limit}`,
      }),
      providesTags: ["Types"],
    }),

    getCertainTypes: build.query<
      TGetCertainTypesResponse,
      IGetCertainTypesRequest
    >({
      query: (body) => ({ url: `/types/${body.id}` }),
      providesTags: ["Types"],
    }),

    editTypes: build.mutation<TEditTypesResponse, IEditTypesRequest>({
      query: (body) => ({
        url: `/types/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Types"],
    }),

    deleteTypes: build.mutation<TDeleteTypesResponse, IDeleteTypesRequest>({
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
