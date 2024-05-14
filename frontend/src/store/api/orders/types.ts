import { IOrder } from "types/IOrder";

export interface IAddOrderRequest {
  user_id: number | undefined;
  quantity: number;
  summary: number;
  products: IOrderProductss[];
  address: string;
}

export interface IOrderProductss {
  product_id: number;
  quantity: number;
}

export interface IGetOrdersRequest {
  id: number | undefined;
  page: number;
  limit: number;
}

export interface IGetOrdersResponse {
  totalCount: number;
  orders: IOrder[];
}

export interface IEditOrderRequest {
  id: number;
  status: string;
}

export interface IGetCertainOrdersRequest {
  page: number;
  limit: number;
}

export interface IGetCertainOrdersResponse {
  totalCount: number;
  orders: IOrder[];
}

export interface IDeleteOrderRequest {
  id: number;
}
