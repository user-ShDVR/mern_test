import { IProductsInCart } from "types/IProduct";

export interface IAddCartsRequest {
  user_id: number;
}

export interface IGetCartsRequest {
  page: number;
  limit: number;
}

export interface IGetCartsResponse {
  id: number;
  user_id: number;
  carts_products: IProductsInCart[];
}

export interface IGetCertainCartsRequest {
  id: number | undefined;
}

export interface IEditCartsRequest {
  id: string;
  user_id?: number;
}

export interface IDeleteCartsRequest {
  id: string;
}

export interface IClearCartsRequest {
  id: number | undefined;
}
