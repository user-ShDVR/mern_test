import { IProduct } from "types/IProduct";

export type IAddProductsRequest = {
  name: string;
  description: string;
  characteristics: string[];
  price: number;
  image_id: number;
  type_id: number;
};

export interface IGetProductsRequest {
  page: number;
  limit: number;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  sortOrder: string;
  type: string;
}

export interface IGetProductsResponse {
  products: IProduct[];
  totalCount: number;
}

export interface IGetCertainProductsRequest {
  id: string | undefined;
}

export interface IGetCertainProductsResponse extends IProduct {}

export type IEditProductsRequest = {
  id: number;
  name: string;
  description: string;
  characteristics: string[];
  price: number;
  image_id: number;
  type_id: number;
};

export interface IDeleteProductsRequest {
  id: number;
}
