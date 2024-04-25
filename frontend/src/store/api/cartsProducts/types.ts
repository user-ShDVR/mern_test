export type ICartsProductsResponse = {
  cart_id: number;
  product_id: number;
  quantity: number;
};
export type EditCartsProductsRequest = {
  id?: string;
  cart_id?: number;
  product_id?: number;
  quantity?: number;
};

export interface IGetCartsProductsRequest {
  page: number;
  limit: number;
}

export type IDeleteCartsProductsRequest = {
  product_id: number;
  user_id: number;
};

export type IGetCertainCartsProductsRequest = {
  id: string;
};
