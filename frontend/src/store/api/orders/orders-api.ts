import { createRtkApi as api } from "store/api/createRtkApi";

import {
  IAddOrderRequest,
  IDeleteOrderRequest,
  IGetCertainOrdersRequest,
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

    getCertainOrders: build.query<unknown, IGetCertainOrdersRequest>({
      query: (body) => ({ url: `/orders/${body.id}` }),
    }),

    ordersControllerRemove: build.mutation<unknown, IDeleteOrderRequest>({
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
  useGetCertainOrdersQuery,
  useOrdersControllerRemoveMutation,
} = injectedRtkApi;
