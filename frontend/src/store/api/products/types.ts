export type IAddProductsRequest = {
  name: string;
  description: string;
  characteristics: string[];
  price: number;
  image_id: number;
  type_id: number;
};

export interface IGetProductsRequest {
  page: number;
  limit: number;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  sortOrder: string;
  type: string;
}

export interface IGetCertainProductsRequest {
  id: string;
}

export type IEditProductsRequest = {
  id?: string;
  name?: string;
  description?: string;
  characteristics?: string[];
  price?: number;
  image_id?: number;
  type_id?: number;
};

export interface IDeleteProductsRequest {
  id: string;
}
