import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  TGetAuthUserRequest,
  TGetAuthUserResponse,
  TSignInRequest,
  TSignInResponse,
  TSignOutRequest,
  TSignOutResponse,
  TSignUpRequest,
  TSignUpResponse,
} from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    signUp: build.mutation<TSignUpResponse, TSignUpRequest>({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    signIn: build.mutation<TSignInResponse, TSignInRequest>({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    signOut: build.mutation<TSignOutResponse, TSignOutRequest>({
      query: () => ({ url: "/auth/sign-out", method: "POST" }),
      invalidatesTags: ["Auth"],
      onQueryStarted(_args, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => {
          dispatch(authApi.util.resetApiState());
        });
      },
    }),

    getAuthUser: build.query<TGetAuthUserResponse, TGetAuthUserRequest>({
      query: () => ({ url: "/auth/session" }),
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useGetAuthUserQuery,
} = authApi;
