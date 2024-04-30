import { createRtkApi as api } from "store/api/createRtkApi";

import {
  IAddCartsRequest,
  IClearCartsRequest,
  IDeleteCartsRequest,
  IEditCartsRequest,
  IGetCartsRequest,
  IGetCartsResponse,
  IGetCertainCartsRequest,
} from "./types";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    addCart: build.mutation<unknown, IAddCartsRequest>({
      query: (body) => ({
        url: `/carts`,
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

  overrideExisting: false,
});

export { injectedRtkApi as cartsApi };

export const {
  useAddCartMutation,
  useGetCartsQuery,
  useGetCertainCartsQuery,
  useEditCartsMutation,
  useDeleteCartsMutation,
  useClearCartsMutation,
} = injectedRtkApi;
