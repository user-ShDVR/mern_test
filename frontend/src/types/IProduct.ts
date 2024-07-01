import { MouseEvent } from "react";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  image_id: number;
  type_id: number;
  deleted: boolean;
  description: string;
  image: {
    id: number;
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
  };
  type: {
    id: number;
    name: string;
    url: string;
    image_id: number;
  };
  characteristics: {
    id: number;
    key: string;
    product_id: number;
    value: string;
  }[];
  key?: string;
}

export type TButtonEvent = MouseEvent<HTMLButtonElement, MouseEvent>;

export interface IProductChangeQuantity {
  product_id: number;
  quantity: number;
  product: IProduct;
}

export interface IProductsInCart {
  cart_id: number;
  id: number;
  product: IProduct;
  product_id: number;
  quantity: number;
}

export interface IProductCharacteristics {
  rowKey?: string;
  key?: string;
  value?: string;
}
