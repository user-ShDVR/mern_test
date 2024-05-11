import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { userActions } from "store/features/userSlice";

import { ISignInFields, ISignUpFields, IUserResponse } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  endpoints: (build) => ({
    signUp: build.mutation<IUserResponse, ISignUpFields>({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: { ...body },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userActions.setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    signIn: build.mutation<IUserResponse, ISignInFields>({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: { ...body },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userActions.setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    signOut: build.mutation<unknown, void>({
      query: () => ({ url: "/auth/sign-out", method: "POST" }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Вы вышли из системы", data);
          dispatch(userActions.setUser(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getAuthUser: build.query<ISignUpFields, void>({
      query: () => ({ url: "/auth/session" }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userActions.setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useGetAuthUserQuery,
} = authApi;
