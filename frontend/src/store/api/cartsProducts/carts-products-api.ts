import { createRtkApi as api } from "../createRtkApi";
import {
  EditCartsProductsRequest,
  ICartsProductsResponse,
  IDeleteCartsProductsRequest,
  IGetCartsProductsRequest,
  IGetCertainCartsProductsRequest,
} from "./types";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    addCartsProducts: build.mutation<unknown, ICartsProductsResponse>({
      query: (body) => ({
        url: `/carts-products`,
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

    editCartsProducts: build.mutation<unknown, EditCartsProductsRequest>({
      query: (body) => ({
        url: `/carts-products/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),
  }),

  overrideExisting: false,
});

export { injectedRtkApi as cartsProductsApi };

export const {
  useAddCartsProductsMutation,
  useGetCartsProductsQuery,
  useDeleteCartsProductsMutation,
  useGetCertainCartsProductsQuery,
  useEditCartsProductsMutation,
} = injectedRtkApi;
