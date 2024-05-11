import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IEditCartsProductsRequest,
  IAddCartsProductsResponse,
  IDeleteCartsProductsRequest,
  IGetCartsProductsRequest,
  IGetCertainCartsProductsRequest,
} from "./types";

export const cartsProductsApi = createApi({
  reducerPath: "cartsProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  endpoints: (build) => ({
    addCartsProducts: build.mutation<unknown, IAddCartsProductsResponse>({
      query: (body) => ({
        url: "/carts-products",
        method: "POST",
        body: { ...body },
      }),
    }),

    getCartsProducts: build.query<unknown, IGetCartsProductsRequest>({
      query: (body) => ({
        url: `/carts-products?page=${body.page}&limit=${body.limit}`,
      }),
    }),

    deleteCartsProducts: build.mutation<unknown, IDeleteCartsProductsRequest>({
      query: (body) => ({
        url: `/carts-products?product_id=${body.product_id}&user_id=${body.user_id}`,
        method: "DELETE",
      }),
    }),

    getCertainCartsProducts: build.query<
      unknown,
      IGetCertainCartsProductsRequest
    >({
      query: (body) => ({ url: `/carts-products/${body.id}` }),
    }),

    editCartsProducts: build.mutation<unknown, IEditCartsProductsRequest>({
      query: (body) => ({
        url: `/carts-products/${body.id}`,
        method: "PATCH",
        body: { product_id: body.product_id, quantity: body.quantity },
      }),
    }),
  }),
});

export const {
  useAddCartsProductsMutation,
  useGetCartsProductsQuery,
  useDeleteCartsProductsMutation,
  useGetCertainCartsProductsQuery,
  useEditCartsProductsMutation,
} = cartsProductsApi;
