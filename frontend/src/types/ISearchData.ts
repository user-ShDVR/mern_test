import { IOrder } from "./IOrder";
import { IProduct } from "./IProduct";
import { IType } from "./IType";

export interface ISearchData {
  products: IProduct[];
  types: IType[];
  orders: IOrder[];
}
