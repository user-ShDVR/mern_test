import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IEditUsersRequest,
  IGetUsersRequest,
  IGetUsersResponse,
  TEditUsersResponse,
} from "./types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<IGetUsersResponse, IGetUsersRequest>({
      query: (body) => ({
        url: `/users?page=${body.page}&limit=${body.limit}`,
      }),
      providesTags: ["Users"],
    }),

    editUsers: build.mutation<TEditUsersResponse, IEditUsersRequest>({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useEditUsersMutation } = usersApi;
