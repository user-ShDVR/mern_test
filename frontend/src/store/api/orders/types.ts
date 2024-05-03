export interface IAddOrderRequest {
  user_id: number;
  products_id: number;
  quantity: number;
  summary: number;
  products: Record<string, number>[];
}

export interface IGetOrdersRequest {
  page: number;
  limit: number;
}

export interface IGetCertainOrderRequest {
  id: string;
}

export interface IDeleteOrderRequest {
  id: string;
}
