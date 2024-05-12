import { IImage } from "types/IImage";

export interface IGetImagesResponse {
  images: IImage[];
  totalCount: number;
}

export interface IAddImagesRequest {
  file?: Blob;
}

export interface IDeleteImagesRequest {
  id: number;
}
