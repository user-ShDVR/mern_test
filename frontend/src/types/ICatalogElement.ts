export interface IImage {
  id?: number;
  filename: string;
}

export interface IType {
  id: number;
  name: string;
  url: string;
  image_id: number;
  image: IImage;
}

export interface ICatalogElement extends IType {
  totalCount: number;
  types: IType[];
}
