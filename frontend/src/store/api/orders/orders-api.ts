import { createRtkApi as api } from "store/api/createRtkApi";

import {
  IAddOrderRequest,
  IDeleteOrderRequest,
  IEditOrderRequest,
  IGetCertainOrdersRequest,
  IGetCertainOrdersResponse,
  IGetOrdersRequest,
  IGetOrdersResponse,
} from "./types";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    addOrder: build.mutation<unknown, IAddOrderRequest>({
      query: (body) => ({
        url: `/orders`,
        method: "POST",
        body: { ...body },
      }),
    }),

    getOrders: build.query<IGetOrdersResponse, IGetOrdersRequest>({
      query: (body) => ({
        url: `/orders?id=${body.id}&page=${body.page}&limit=${body.limit}`,
      }),
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

  overrideExisting: false,
});

export { injectedRtkApi as ordersApi };

export const {
  useAddOrderMutation,
  useGetOrdersQuery,
  useGetOrdersForAdminQuery,
  useEditOrdersMutation,
  useDeleteOrdersMutation,
} = injectedRtkApi;
