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
}

export interface IProductFields {
  product_id: number;
  quantity: number;
  product: IProduct;
}

export interface IGetCertainCartsResponse {
  id: number;
  user_id: number;
  carts_products: IProduct[];
}
