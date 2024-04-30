import { createRtkApi as api } from "store/api/createRtkApi";

import { IAddImagesRequest, IGetImagesRequest } from "./types";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getImages: build.query<IGetImagesRequest[], null>({
      query: () => ({ url: `/images` }),
    }),

    addImages: build.mutation<unknown, IAddImagesRequest>({
      query: (body) => ({
        url: `/images`,
        method: "POST",
        body: { ...body },
        formData: true,
      }),
    }),
  }),

  overrideExisting: false,
});

export { injectedRtkApi as imagesApi };

export const { useGetImagesQuery, useAddImagesMutation } = injectedRtkApi;
