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
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    addOrder: build.mutation<unknown, IAddOrderRequest>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body: { ...body },
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
      IGetCertainOrdersResponse,
      IGetCertainOrdersRequest
    >({
      query: (body) => ({
        url: `/orders/admin?page=${body.page}&limit=${body.limit}`,
      }),
      providesTags: ["Orders"],
    }),

    editOrders: build.mutation<unknown, IEditOrderRequest>({
      query: (body) => ({
        url: `/orders/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
      invalidatesTags: ["Orders"],
    }),

    deleteOrders: build.mutation<unknown, IDeleteOrderRequest>({
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
