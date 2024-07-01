import { IProduct } from "./IProduct";

export interface IOrderProducts {
  product_id: number;
  quantity: number;
}

export interface IOrder {
  id: number;
  user_id: number;
  summary: number;
  quantity: number;
  order_products: IOrderProducts[];
  created: string;
  status: string;
  key?: string;
  address?: string;
}

export interface IOrderProducts {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  product: IProduct;
}

export interface IAdressFields {
  locality: string;
  street: string;
  house: string;
  flat: string;
  comment: string;
}
