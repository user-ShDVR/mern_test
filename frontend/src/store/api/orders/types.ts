import { IOrder, IOrderProducts } from "types/IOrder";

export type IAddOrderResponse = IOrder;
export interface IAddOrderRequest {
  user_id: number | undefined;
  quantity: number;
  summary: number;
  products: IOrderProducts[];
  address: string;
}

export interface IGetOrdersResponse {
  totalCount: number;
  orders: IOrder[];
}

export interface IGetOrdersRequest {
  id: number | undefined;
  page: number;
  limit: number;
}

export interface IGetOrdersForAdminResponse {
  totalCount: number;
  orders: IOrder[];
}

export interface IGetOrdersForAdminRequest {
  page: number;
  limit: number;
}

export type IEditOrdersResponse = IOrder;
export interface IEditOrderRequest {
  id: number;
  status: string;
}

export type IDeleteOrderResponse = void;
export interface IDeleteOrderRequest {
  id: number;
}
