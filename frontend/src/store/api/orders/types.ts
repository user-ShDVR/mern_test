export interface IAddOrder {
  user_id: number;
  products_id: number;
  quantity: number;
  summary: number;
}

export interface IEditOrder {
  id?: string;
  user_id?: number;
  products_id?: number;
  quantity?: number;
  summary?: number;
}

export interface IGetOrders {
  page: number;
  limit: number;
}

export interface IGetCertainOrder {
  id: string;
}

export interface IDeleteOrderRequest {
  id: string;
}
