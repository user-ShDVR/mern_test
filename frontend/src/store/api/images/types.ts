import { IImage } from "types/IImage";

export interface IGetImagesResponse {
  images: IImage[];
  totalCount: number;
}

export type TGetImagesRequest = void;

export type TDeleteImagesResponse = void;
export interface IDeleteImagesRequest {
  id: number;
}
