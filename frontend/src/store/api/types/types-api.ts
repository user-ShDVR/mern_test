import { createRtkApi as api } from "store/api/createRtkApi";

import {
  IAddTypesRequest,
  IDeleteTypesRequest,
  IEditTypesRequest,
  IGetCertainTypesRequest,
  IGetTypesRequest,
  IGetTypesResponse,
} from "./types";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    addTypes: build.mutation<unknown, IAddTypesRequest>({
      query: (body) => ({
        url: `/types`,
        method: "POST",
        body: { ...body },
      }),
    }),

    getTypes: build.query<IGetTypesResponse, IGetTypesRequest>({
      query: (body) => ({
        url: `/types`,
        params: { page: body.page, limit: body.limit },
      }),
    }),

    getCertainTypes: build.query<unknown, IGetCertainTypesRequest>({
      query: (body) => ({ url: `/types/${body.id}` }),
    }),

    editTypes: build.mutation<unknown, IEditTypesRequest>({
      query: (body) => ({
        url: `/types/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),

    deleteTypes: build.mutation<unknown, IDeleteTypesRequest>({
      query: (body) => ({ url: `/types/${body.id}`, method: "DELETE" }),
    }),
  }),

  overrideExisting: false,
});

export { injectedRtkApi as typesApi };

export const {
  useAddTypesMutation,
  useGetTypesQuery,
  useGetCertainTypesQuery,
  useEditTypesMutation,
  useDeleteTypesMutation,
} = injectedRtkApi;
