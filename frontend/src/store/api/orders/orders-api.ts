import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IAddOrderRequest,
  IDeleteOrderRequest,
  IEditOrderRequest,
  IGetCertainOrdersRequest,
  IGetCertainOrdersResponse,
  IGetOrdersRequest,
  IGetOrdersResponse,
} from "./types";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  endpoints: (build) => ({
    addOrder: build.mutation<unknown, IAddOrderRequest>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body: { ...body },
      }),
    }),

    getOrders: build.query<IGetOrdersResponse, IGetOrdersRequest>({
      query: (body) => ({
        url: `/orders?id=${body.id}&page=${body.page}&limit=${body.limit}`,
      }),
      keepUnusedDataFor: 1,
    }),

    getOrdersForAdmin: build.query<
      IGetCertainOrdersResponse,
      IGetCertainOrdersRequest
    >({
      query: (body) => ({
        url: `/orders/admin?page=${body.page}&limit=${body.limit}`,
      }),
    }),

    editOrders: build.mutation<unknown, IEditOrderRequest>({
      query: (body) => ({
        url: `/orders/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),

    deleteOrders: build.mutation<unknown, IDeleteOrderRequest>({
      query: (body) => ({
        url: `/orders/${body.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrdersQuery,
  useGetOrdersForAdminQuery,
  useEditOrdersMutation,
  useDeleteOrdersMutation,
} = ordersApi;
