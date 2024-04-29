export interface IGetImagesRequest {
  id: number;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
}

export interface IAddImagesRequest {
  file?: Blob;
}
