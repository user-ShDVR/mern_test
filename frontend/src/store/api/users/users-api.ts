import { createRtkApi as api } from "../createRtkApi";
import {
  IAddUserRequest,
  IDeleteUsersRequest,
  IEditUsersRequest,
  IGetCertainUsersRequest,
  IGetUsersRequest,
} from "./types";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    addUsers: build.mutation<unknown, IAddUserRequest>({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        body: { ...body },
      }),
    }),

    getUsers: build.query<unknown, IGetUsersRequest>({
      query: (body) => ({
        url: `/users`,
        params: { page: body.page, limit: body.limit },
      }),
    }),

    getCertainUsers: build.query<unknown, IGetCertainUsersRequest>({
      query: (body) => ({ url: `/users/${body.id}` }),
    }),

    editUsers: build.mutation<unknown, IEditUsersRequest>({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),

    deleteUsers: build.mutation<unknown, IDeleteUsersRequest>({
      query: (body) => ({ url: `/users/${body.id}`, method: "DELETE" }),
    }),
  }),
});

export { injectedRtkApi as usersApi };

export const {
  useAddUsersMutation,
  useGetUsersQuery,
  useGetCertainUsersQuery,
  useEditUsersMutation,
  useDeleteUsersMutation,
} = injectedRtkApi;
