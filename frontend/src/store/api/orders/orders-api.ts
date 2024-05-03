import { createRtkApi as api } from "store/api/createRtkApi";

import {
  IAddOrderRequest,
  IDeleteOrderRequest,
  IGetCertainOrderRequest,
  IGetOrdersRequest,
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

    getOrders: build.query<unknown, IGetOrdersRequest>({
      query: (body) => ({
        url: `/orders?page=${body.page}&limit=${body.limit}`,
      }),
    }),

    getCertainOrder: build.query<unknown, IGetCertainOrderRequest>({
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
  useGetCertainOrderQuery,
  useOrdersControllerRemoveMutation,
} = injectedRtkApi;
