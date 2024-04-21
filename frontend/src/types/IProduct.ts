export interface IProduct {
  id: number;
  name: string;
  price: number;
  image_id: number;
  type_id: number;
  deleted: boolean;
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
}

export interface IProductsResponse {
  totalCount: number;
  products: IProduct[];
}
