import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IAddCartsRequest,
  IClearCartsRequest,
  IDeleteCartsRequest,
  IEditCartsRequest,
  IGetCartsRequest,
  IGetCartsResponse,
  IGetCertainCartsRequest,
} from "./types";

export const cartsApi = createApi({
  reducerPath: "cartsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  endpoints: (build) => ({
    addCart: build.mutation<unknown, IAddCartsRequest>({
      query: (body) => ({
        url: "/carts",
        method: "POST",
        body: { ...body },
      }),
    }),

    getCarts: build.query<unknown, IGetCartsRequest>({
      query: (body) => ({
        url: `/carts?page=${body.page}&limit=${body.limit}`,
      }),
    }),

    getCertainCarts: build.query<IGetCartsResponse, IGetCertainCartsRequest>({
      query: (body) => ({ url: `/carts/${body.id}` }),
    }),

    editCarts: build.mutation<unknown, IEditCartsRequest>({
      query: (body) => ({
        url: `/carts/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),

    deleteCarts: build.mutation<unknown, IDeleteCartsRequest>({
      query: (body) => ({ url: `/carts/${body.id}`, method: "DELETE" }),
    }),

    clearCarts: build.mutation<unknown, IClearCartsRequest>({
      query: (body) => ({
        url: `/carts/${body.id}/clear`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAddCartMutation,
  useGetCartsQuery,
  useGetCertainCartsQuery,
  useEditCartsMutation,
  useDeleteCartsMutation,
  useClearCartsMutation,
} = cartsApi;
