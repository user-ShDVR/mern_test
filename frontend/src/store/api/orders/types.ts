import { IOrder, IOrderProducts } from "types/IOrder";

export interface IAddOrderRequest {
  user_id: number | undefined;
  quantity: number;
  summary: number;
  products: IOrderProducts[];
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
