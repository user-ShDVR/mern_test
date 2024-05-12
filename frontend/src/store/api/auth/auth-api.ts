import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ISignInFields, ISignUpFields, IUserResponse } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    signUp: build.mutation<IUserResponse, ISignUpFields>({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["Auth"],
    }),

    signIn: build.mutation<IUserResponse, ISignInFields>({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["Auth"],
    }),

    signOut: build.mutation<unknown, void>({
      query: () => ({ url: "/auth/sign-out", method: "POST" }),
      invalidatesTags: ["Auth"],
      onQueryStarted(_args, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => {
          dispatch(authApi.util.resetApiState());
        });
      },
    }),

    getAuthUser: build.query<ISignUpFields, void>({
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
