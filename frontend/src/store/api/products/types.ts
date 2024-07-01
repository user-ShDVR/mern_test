import { IProduct, IProductCharacteristics } from "types/IProduct";

export type IAddProductsResponse = IProduct;
export type IAddProductsRequest = {
  name: string;
  description: string;
  characteristics: IProductCharacteristics[];
  price: number;
  image_id: number;
  type_id: number;
};

export interface IGetProductsResponse {
  products: IProduct[];
  totalCount: number;
}

export interface IGetProductsRequest {
  page: number;
  limit: number;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  sortOrder: string;
  type: string;
  searchValue: string;
}

export type TGetCertainProductsResponse = IProduct;
export interface IGetCertainProductsRequest {
  id: string | undefined;
}

export type IEditProductResponse = IProduct;
export interface IEditProductsRequest {
  id: number;
  name: string;
  description: string;
  characteristics: IProductCharacteristics[];
  price: number;
  image_id: number;
  type_id: number;
}

export type IDeleteProductsResponse = void;
export interface IDeleteProductsRequest {
  id: number;
}
