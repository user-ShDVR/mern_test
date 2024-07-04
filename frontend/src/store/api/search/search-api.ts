import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IGetSearchDataRequest, IGetSearchDataResponse } from "./types";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Search"],
  endpoints: (build) => ({
    getSearchData: build.query<IGetSearchDataResponse, IGetSearchDataRequest>({
      query: (body) => ({
        url: `/search?query=${body.query}`,
      }),
      providesTags: ["Search"],
    }),
  }),
});

export const { useGetSearchDataQuery } = searchApi;
