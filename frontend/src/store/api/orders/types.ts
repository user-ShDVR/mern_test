import { IOrder } from "types/IOrder";

export interface IAddOrderRequest {
  user_id: number;
  quantity: number;
  summary: number;
  products: Record<string, number>[];
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

export interface IGetCertainOrdersRequest {
  id: number | undefined;
}

export interface IDeleteOrderRequest {
  id: string;
}
