import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IAddOrderRequest,
  IAddOrderResponse,
  IDeleteOrderRequest,
  IDeleteOrderResponse,
  IEditOrderRequest,
  IEditOrdersResponse,
  IGetOrdersForAdminRequest,
  IGetOrdersForAdminResponse,
  IGetOrdersRequest,
  IGetOrdersResponse,
} from "./types";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    addOrder: build.mutation<IAddOrderResponse, IAddOrderRequest>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),

    getOrders: build.query<IGetOrdersResponse, IGetOrdersRequest>({
      query: (body) => ({
        url: `/orders?id=${body.id}&page=${body.page}&limit=${body.limit}`,
      }),
      providesTags: ["Orders"],
    }),

    getOrdersForAdmin: build.query<
      IGetOrdersForAdminResponse,
      IGetOrdersForAdminRequest
    >({
      query: (body) => ({
        url: `/orders/admin?page=${body.page}&limit=${body.limit}`,
      }),
      providesTags: ["Orders"],
    }),

    editOrders: build.mutation<IEditOrdersResponse, IEditOrderRequest>({
      query: (body) => ({
        url: `/orders/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),

    deleteOrders: build.mutation<IDeleteOrderResponse, IDeleteOrderRequest>({
      query: (body) => ({
        url: `/orders/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
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
