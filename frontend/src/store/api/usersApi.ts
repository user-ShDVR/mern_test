import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => {
  return localStorage.getItem("token");
};

export const usersApi = createApi({
  reducerPath: "usersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/update`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateUserMutation, useGetAllUsersQuery } = usersApi;
