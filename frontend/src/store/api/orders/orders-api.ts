import { createRtkApi as api } from "../createRtkApi";
import {
  IAddOrder,
  IDeleteOrderRequest,
  IEditOrder,
  IGetCertainOrder,
  IGetOrders,
} from "./types";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    addOrder: build.mutation<unknown, IAddOrder>({
      query: (body) => ({
        url: `/orders`,
        method: "POST",
        body: { ...body },
      }),
    }),

    getOrders: build.query<unknown, IGetOrders>({
      query: (body) => ({
        url: `/orders?page=${body.page}&limit=${body.limit}`,
      }),
    }),

    getCertainOrder: build.query<unknown, IGetCertainOrder>({
      query: (body) => ({ url: `/orders/${body.id}` }),
    }),

    editOrder: build.mutation<unknown, IEditOrder>({
      query: (body) => ({
        url: `/orders/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
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
  useEditOrderMutation,
  useOrdersControllerRemoveMutation,
} = injectedRtkApi;
