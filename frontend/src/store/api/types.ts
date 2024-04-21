export interface IUser {
  name: string;
  surname: string;
  lastname: string;
  email: string;
  role: string;
}

export interface IUserState {
  user: IUser | null;
}

// generate types
export type UsersControllerCreateApiResponse = unknown;
export type UsersControllerCreateApiArg = {
  createUserDto: CreateUserDto;
};

export type UsersControllerFindAllApiResponse = unknown;
export type UsersControllerFindAllApiArg = {
  page: number;
  limit: number;
};

export type UsersControllerFindOneApiResponse = unknown;
export type UsersControllerFindOneApiArg = {
  id: string;
};

export type UsersControllerUpdateApiResponse = unknown;
export type UsersControllerUpdateApiArg = {
  id: string;
  updateUserDto: UpdateUserDto;
};

export type UsersControllerRemoveApiResponse = unknown;
export type UsersControllerRemoveApiArg = {
  id: string;
};

export type ProductsControllerCreateApiResponse = unknown;
export type ProductsControllerCreateApiArg = {
  createProductDto: CreateProductDto;
};

export type ProductsControllerFindAllApiResponse = unknown;
export type ProductsControllerFindAllApiArg = {
  page: number;
  limit: number;
  minPrice: number;
  maxPrice: number;
};

export type ProductsControllerFindOneApiResponse = unknown;
export type ProductsControllerFindOneApiArg = {
  id: string;
};

export type ProductsControllerUpdateApiResponse = unknown;
export type ProductsControllerUpdateApiArg = {
  id: string;
  updateProductDto: UpdateProductDto;
};

export type ProductsControllerRemoveApiResponse = unknown;
export type ProductsControllerRemoveApiArg = {
  id: string;
};

export type TypesControllerCreateApiResponse = unknown;
export type TypesControllerCreateApiArg = {
  createTypeDto: CreateTypeDto;
};

export type TypesControllerFindAllApiResponse = unknown;
export type TypesControllerFindAllApiArg = {
  page: number;
  limit: number;
};

export type TypesControllerFindOneApiResponse = unknown;
export type TypesControllerFindOneApiArg = {
  id: string;
};

export type TypesControllerUpdateApiResponse = unknown;
export type TypesControllerUpdateApiArg = {
  id: string;
  updateTypeDto: UpdateTypeDto;
};

export type TypesControllerRemoveApiResponse = unknown;
export type TypesControllerRemoveApiArg = {
  id: string;
};

export type ImagesControllerCreateApiResponse = unknown;
export type ImagesControllerCreateApiArg = {
  body: {
    file?: Blob;
  };
};

export type CartsControllerCreateApiResponse = unknown;
export type CartsControllerCreateApiArg = {
  createCartDto: CreateCartDto;
};

export type CartsControllerFindAllApiResponse = unknown;
export type CartsControllerFindAllApiArg = {
  page: number;
  limit: number;
};

export type CartsControllerFindOneApiResponse = unknown;
export type CartsControllerFindOneApiArg = {
  id: string;
};

export type CartsControllerUpdateApiResponse = unknown;
export type CartsControllerUpdateApiArg = {
  id: string;
  updateCartDto: UpdateCartDto;
};

export type CartsControllerRemoveApiResponse = unknown;
export type CartsControllerRemoveApiArg = {
  id: string;
};

export type CartsControllerClearApiResponse = unknown;
export type CartsControllerClearApiArg = {
  id: string;
};

export type OrdersControllerCreateApiResponse = unknown;
export type OrdersControllerCreateApiArg = {
  createOrderDto: CreateOrderDto;
};

export type OrdersControllerFindAllApiResponse = unknown;
export type OrdersControllerFindAllApiArg = {
  page: number;
  limit: number;
};

export type OrdersControllerFindOneApiResponse = unknown;
export type OrdersControllerFindOneApiArg = {
  id: string;
};

export type OrdersControllerUpdateApiResponse = unknown;
export type OrdersControllerUpdateApiArg = {
  id: string;
  updateOrderDto: UpdateOrderDto;
};

export type OrdersControllerRemoveApiResponse = unknown;
export type OrdersControllerRemoveApiArg = {
  id: string;
};

export type CartsProductsControllerCreateApiResponse = unknown;
export type CartsProductsControllerCreateApiArg = {
  createCartsProductDto: CreateCartsProductDto;
};

export type CartsProductsControllerFindAllApiResponse = unknown;
export type CartsProductsControllerFindAllApiArg = {
  page: number;
  limit: number;
};

export type CartsProductsControllerFindOneApiResponse = unknown;
export type CartsProductsControllerFindOneApiArg = {
  id: string;
};

export type CartsProductsControllerUpdateApiResponse = unknown;
export type CartsProductsControllerUpdateApiArg = {
  id: string;
  updateCartsProductDto: UpdateCartsProductDto;
};

export type CartsProductsControllerRemoveApiResponse = unknown;
export type CartsProductsControllerRemoveApiArg = {
  id: string;
};

export type AuthControllerSignUpApiResponse =
  /** status 201  */ UserResponseDto;
export type AuthControllerSignUpApiArg = {
  signUpDto: SignUpDto;
};

export type AuthControllerSignInApiResponse =
  /** status 200  */ UserResponseDto;
export type AuthControllerSignInApiArg = {
  signInDto: SignInDto;
};

export type AuthControllerSignOutApiResponse = unknown;
export type AuthControllerSignOutApiArg = void;
export type AuthControllerGetSesssionInfoApiResponse =
  /** status 200  */ UserResponseDto;
export type AuthControllerGetSesssionInfoApiArg = void;
export type CreateUserDto = {
  email: string;
  hash: string;
  salt: string;
  surname: string;
  name: string;
  lastname: string;
};

export type UpdateUserDto = {
  email?: string;
  hash?: string;
  salt?: string;
  surname?: string;
  name?: string;
  lastname?: string;
};

export type CreateProductDto = {
  name: string;
  price: number;
  image_id: number;
  type_id: number;
};

export type UpdateProductDto = {
  name?: string;
  price?: number;
  image_id?: number;
  type_id?: number;
};

export type CreateTypeDto = {
  name: string;
  image_id: number;
};

export type UpdateTypeDto = {
  name?: string;
  image_id?: number;
};

export type CreateCartDto = {
  user_id: number;
};

export type UpdateCartDto = {
  user_id?: number;
};

export type CreateOrderDto = {
  user_id: number;
  products_id: number;
  quantity: number;
  summary: number;
};

export type UpdateOrderDto = {
  user_id?: number;
  products_id?: number;
  quantity?: number;
  summary?: number;
};

export type CreateCartsProductDto = {
  cart_id: number;
  product_id: number;
  quantity: number;
};

export type UpdateCartsProductDto = {
  cart_id?: number;
  product_id?: number;
  quantity?: number;
};

export type UserResponseDto = {
  id: number;
  email: string;
  surname: string;
  name: string;
  lastname: string;
  role: string;
};

export type SignUpDto = {
  email: string;
  password: string;
  surname: string;
  name: string;
  lastname: string;
};

export type SignInDto = {
  email: string;
  password: string;
};
