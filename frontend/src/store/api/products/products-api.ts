import { createRtkApi as api } from "store/api/createRtkApi";

import {
  IAddProductsRequest,
  IDeleteProductsRequest,
  IEditProductsRequest,
  IGetCertainProductsRequest,
  IGetCertainProductsResponse,
  IGetProductsRequest,
  IGetProductsResponse,
} from "./types";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    addProducts: build.mutation<unknown, IAddProductsRequest>({
      query: (body) => ({
        url: `/products`,
        method: "POST",
        body: { ...body },
      }),
    }),

    getProducts: build.query<IGetProductsResponse, IGetProductsRequest>({
      query: (body) => ({
        url: `/products?page=${body.page}&limit=${body.limit}&minPrice=${body.minPrice}&maxPrice=${body.maxPrice}&sortBy=${body.sortBy}&sortOrder=${body.sortOrder}&type=${body["type"]}&searchValue=${body.searchValue}`,
      }),
    }),

    getCertainProducts: build.query<
      IGetCertainProductsResponse,
      IGetCertainProductsRequest
    >({
      query: (body) => ({ url: `/products/${body.id}` }),
    }),

    editProducts: build.mutation<unknown, IEditProductsRequest>({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),

    deleteProducts: build.mutation<unknown, IDeleteProductsRequest>({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: "DELETE",
      }),
    }),
  }),

  overrideExisting: false,
});

export { injectedRtkApi as productsApi };

export const {
  useAddProductsMutation,
  useGetProductsQuery,
  useGetCertainProductsQuery,
  useEditProductsMutation,
  useDeleteProductsMutation,
} = injectedRtkApi;
