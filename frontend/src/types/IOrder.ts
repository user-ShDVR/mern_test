import { IProduct } from "./IProduct";

export interface IOrder {
  id: number;
  user_id: number;
  summary: number;
  quantity: number;
  order_products: IOrderProducts[];
  created: string;
  status: string;
}

export interface IOrderProducts {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  product: IProduct;
}
