import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IAddProductsRequest,
  IDeleteProductsRequest,
  IEditProductsRequest,
  IGetCertainProductsRequest,
  IGetCertainProductsResponse,
  IGetProductsRequest,
  IGetProductsResponse,
} from "./types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    addProducts: build.mutation<unknown, IAddProductsRequest>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["Products"],
    }),

    getProducts: build.query<IGetProductsResponse, IGetProductsRequest>({
      query: (body) => ({
        url: `/products?page=${body.page}&limit=${body.limit}&minPrice=${body.minPrice}&maxPrice=${body.maxPrice}&sortBy=${body.sortBy}&sortOrder=${body.sortOrder}&type=${body["type"]}&searchValue=${body.searchValue}`,
      }),
      providesTags: ["Products"],
    }),

    getCertainProducts: build.query<
      IGetCertainProductsResponse,
      IGetCertainProductsRequest
    >({
      query: (body) => ({ url: `/products/${body.id}` }),
      providesTags: ["Products"],
    }),

    editProducts: build.mutation<unknown, IEditProductsRequest>({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProducts: build.mutation<unknown, IDeleteProductsRequest>({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useAddProductsMutation,
  useGetProductsQuery,
  useGetCertainProductsQuery,
  useEditProductsMutation,
  useDeleteProductsMutation,
} = productsApi;
