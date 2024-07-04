import { IOrder } from "types/IOrder";
import { IProduct } from "types/IProduct";
import { IType } from "types/IType";

export interface IGetSearchDataResponse {
  products: IProduct[];
  types: IType[];
  orders: IOrder[];
}

export interface IGetSearchDataRequest {
  query: string;
}
