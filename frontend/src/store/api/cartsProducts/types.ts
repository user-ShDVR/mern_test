export type IAddCartsProductsResponse = {
  cart_id: number | undefined;
  product_id: number;
  quantity: number;
};

export type IEditCartsProductsRequest = {
  id?: number;
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
  user_id: number | undefined;
};

export type IGetCertainCartsProductsRequest = {
  id: string;
};
