import { createRtkApi as api } from "../createRtkApi";
import { IAddImagesRequest } from "./types";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    addImages: build.mutation<unknown, IAddImagesRequest>({
      query: (body) => ({
        url: `/images`,
        method: "POST",
        body: { ...body },
      }),
    }),
  }),

  overrideExisting: false,
});

export { injectedRtkApi as imagesApi };

export const { useAddImagesMutation } = injectedRtkApi;
