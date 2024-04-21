import { userActions } from "../features/userSlice";
import { emptySplitApi as api } from "./emptyApi";
import {
  // users
  UsersControllerCreateApiResponse,
  UsersControllerCreateApiArg,
  UsersControllerFindAllApiResponse,
  UsersControllerFindAllApiArg,
  UsersControllerFindOneApiResponse,
  UsersControllerFindOneApiArg,
  UsersControllerUpdateApiResponse,
  UsersControllerUpdateApiArg,
  UsersControllerRemoveApiResponse,
  UsersControllerRemoveApiArg,
  // users

  // products
  ProductsControllerCreateApiResponse,
  ProductsControllerCreateApiArg,
  ProductsControllerFindAllApiResponse,
  ProductsControllerFindAllApiArg,
  ProductsControllerFindOneApiResponse,
  ProductsControllerFindOneApiArg,
  ProductsControllerUpdateApiResponse,
  ProductsControllerUpdateApiArg,
  ProductsControllerRemoveApiResponse,
  ProductsControllerRemoveApiArg,
  // products

  // types
  TypesControllerCreateApiResponse,
  TypesControllerCreateApiArg,
  TypesControllerFindAllApiResponse,
  TypesControllerFindAllApiArg,
  TypesControllerFindOneApiResponse,
  TypesControllerFindOneApiArg,
  TypesControllerUpdateApiResponse,
  TypesControllerUpdateApiArg,
  TypesControllerRemoveApiResponse,
  TypesControllerRemoveApiArg,
  // types

  // images
  ImagesControllerCreateApiResponse,
  ImagesControllerCreateApiArg,
  // images

  // carts
  CartsControllerCreateApiResponse,
  CartsControllerCreateApiArg,
  CartsControllerFindAllApiResponse,
  CartsControllerFindAllApiArg,
  CartsControllerFindOneApiResponse,
  CartsControllerFindOneApiArg,
  CartsControllerUpdateApiResponse,
  CartsControllerUpdateApiArg,
  CartsControllerRemoveApiResponse,
  CartsControllerRemoveApiArg,
  CartsControllerClearApiResponse,
  CartsControllerClearApiArg,
  // carts

  // orders
  OrdersControllerCreateApiResponse,
  OrdersControllerCreateApiArg,
  OrdersControllerFindAllApiResponse,
  OrdersControllerFindAllApiArg,
  OrdersControllerFindOneApiResponse,
  OrdersControllerFindOneApiArg,
  OrdersControllerUpdateApiResponse,
  OrdersControllerUpdateApiArg,
  OrdersControllerRemoveApiResponse,
  OrdersControllerRemoveApiArg,
  // orders

  // cartsProducts
  CartsProductsControllerCreateApiResponse,
  CartsProductsControllerCreateApiArg,
  CartsProductsControllerFindAllApiResponse,
  CartsProductsControllerFindAllApiArg,
  CartsProductsControllerFindOneApiResponse,
  CartsProductsControllerFindOneApiArg,
  CartsProductsControllerUpdateApiResponse,
  CartsProductsControllerUpdateApiArg,
  CartsProductsControllerRemoveApiResponse,
  CartsProductsControllerRemoveApiArg,
  // cartsProducts

  // auth
  AuthControllerSignUpApiResponse,
  AuthControllerSignUpApiArg,
  AuthControllerSignInApiResponse,
  AuthControllerSignInApiArg,
  AuthControllerSignOutApiResponse,
  AuthControllerSignOutApiArg,
  AuthControllerGetSesssionInfoApiResponse,
  AuthControllerGetSesssionInfoApiArg,
  // auth
} from "./types";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    usersControllerCreate: build.mutation<
      UsersControllerCreateApiResponse,
      UsersControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/users`,
        method: "POST",
        body: queryArg.createUserDto,
      }),
    }),

    usersControllerFindAll: build.query<
      UsersControllerFindAllApiResponse,
      UsersControllerFindAllApiArg
    >({
      query: (queryArg) => ({
        url: `/users`,
        params: { page: queryArg.page, limit: queryArg.limit },
      }),
    }),

    usersControllerFindOne: build.query<
      UsersControllerFindOneApiResponse,
      UsersControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/users/${queryArg.id}` }),
    }),

    usersControllerUpdate: build.mutation<
      UsersControllerUpdateApiResponse,
      UsersControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateUserDto,
      }),
    }),

    usersControllerRemove: build.mutation<
      UsersControllerRemoveApiResponse,
      UsersControllerRemoveApiArg
    >({
      query: (queryArg) => ({ url: `/users/${queryArg.id}`, method: "DELETE" }),
    }),

    productsControllerCreate: build.mutation<
      ProductsControllerCreateApiResponse,
      ProductsControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/products`,
        method: "POST",
        body: queryArg.createProductDto,
      }),
    }),

    productsControllerFindAll: build.query<
      ProductsControllerFindAllApiResponse,
      ProductsControllerFindAllApiArg
    >({
      query: (queryArg) => ({
        url: `/products`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          minPrice: queryArg.minPrice,
          maxPrice: queryArg.maxPrice,
        },
      }),
    }),

    productsControllerFindOne: build.query<
      ProductsControllerFindOneApiResponse,
      ProductsControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/products/${queryArg.id}` }),
    }),

    productsControllerUpdate: build.mutation<
      ProductsControllerUpdateApiResponse,
      ProductsControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/products/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateProductDto,
      }),
    }),

    productsControllerRemove: build.mutation<
      ProductsControllerRemoveApiResponse,
      ProductsControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/products/${queryArg.id}`,
        method: "DELETE",
      }),
    }),

    typesControllerCreate: build.mutation<
      TypesControllerCreateApiResponse,
      TypesControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/types`,
        method: "POST",
        body: queryArg.createTypeDto,
      }),
    }),

    typesControllerFindAll: build.query<
      TypesControllerFindAllApiResponse,
      TypesControllerFindAllApiArg
    >({
      query: (queryArg) => ({
        url: `/types`,
        params: { page: queryArg.page, limit: queryArg.limit },
      }),
    }),

    typesControllerFindOne: build.query<
      TypesControllerFindOneApiResponse,
      TypesControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/types/${queryArg.id}` }),
    }),

    typesControllerUpdate: build.mutation<
      TypesControllerUpdateApiResponse,
      TypesControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/types/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateTypeDto,
      }),
    }),

    typesControllerRemove: build.mutation<
      TypesControllerRemoveApiResponse,
      TypesControllerRemoveApiArg
    >({
      query: (queryArg) => ({ url: `/types/${queryArg.id}`, method: "DELETE" }),
    }),

    imagesControllerCreate: build.mutation<
      ImagesControllerCreateApiResponse,
      ImagesControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/images`,
        method: "POST",
        body: queryArg.body,
      }),
    }),

    cartsControllerCreate: build.mutation<
      CartsControllerCreateApiResponse,
      CartsControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/carts`,
        method: "POST",
        body: queryArg.createCartDto,
      }),
    }),

    cartsControllerFindAll: build.query<
      CartsControllerFindAllApiResponse,
      CartsControllerFindAllApiArg
    >({
      query: (queryArg) => ({
        url: `/carts`,
        params: { page: queryArg.page, limit: queryArg.limit },
      }),
    }),

    cartsControllerFindOne: build.query<
      CartsControllerFindOneApiResponse,
      CartsControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/carts/${queryArg.id}` }),
    }),

    cartsControllerUpdate: build.mutation<
      CartsControllerUpdateApiResponse,
      CartsControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/carts/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateCartDto,
      }),
    }),

    cartsControllerRemove: build.mutation<
      CartsControllerRemoveApiResponse,
      CartsControllerRemoveApiArg
    >({
      query: (queryArg) => ({ url: `/carts/${queryArg.id}`, method: "DELETE" }),
    }),

    cartsControllerClear: build.mutation<
      CartsControllerClearApiResponse,
      CartsControllerClearApiArg
    >({
      query: (queryArg) => ({
        url: `/carts/${queryArg.id}/clear`,
        method: "POST",
      }),
    }),

    ordersControllerCreate: build.mutation<
      OrdersControllerCreateApiResponse,
      OrdersControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/orders`,
        method: "POST",
        body: queryArg.createOrderDto,
      }),
    }),

    ordersControllerFindAll: build.query<
      OrdersControllerFindAllApiResponse,
      OrdersControllerFindAllApiArg
    >({
      query: (queryArg) => ({
        url: `/orders`,
        params: { page: queryArg.page, limit: queryArg.limit },
      }),
    }),

    ordersControllerFindOne: build.query<
      OrdersControllerFindOneApiResponse,
      OrdersControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/orders/${queryArg.id}` }),
    }),

    ordersControllerUpdate: build.mutation<
      OrdersControllerUpdateApiResponse,
      OrdersControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/orders/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateOrderDto,
      }),
    }),

    ordersControllerRemove: build.mutation<
      OrdersControllerRemoveApiResponse,
      OrdersControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/orders/${queryArg.id}`,
        method: "DELETE",
      }),
    }),

    cartsProductsControllerCreate: build.mutation<
      CartsProductsControllerCreateApiResponse,
      CartsProductsControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/carts-products`,
        method: "POST",
        body: queryArg.createCartsProductDto,
      }),
    }),

    cartsProductsControllerFindAll: build.query<
      CartsProductsControllerFindAllApiResponse,
      CartsProductsControllerFindAllApiArg
    >({
      query: (queryArg) => ({
        url: `/carts-products`,
        params: { page: queryArg.page, limit: queryArg.limit },
      }),
    }),

    cartsProductsControllerFindOne: build.query<
      CartsProductsControllerFindOneApiResponse,
      CartsProductsControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/carts-products/${queryArg.id}` }),
    }),

    cartsProductsControllerUpdate: build.mutation<
      CartsProductsControllerUpdateApiResponse,
      CartsProductsControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/carts-products/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateCartsProductDto,
      }),
    }),

    cartsProductsControllerRemove: build.mutation<
      CartsProductsControllerRemoveApiResponse,
      CartsProductsControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/carts-products/${queryArg.id}`,
        method: "DELETE",
      }),
    }),

    authControllerSignUp: build.mutation<
      AuthControllerSignUpApiResponse,
      AuthControllerSignUpApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/sign-up`,
        method: "POST",
        body: queryArg.signUpDto,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userActions.setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    authControllerSignIn: build.mutation<
      AuthControllerSignInApiResponse,
      AuthControllerSignInApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/sign-in`,
        method: "POST",
        body: queryArg.signInDto,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userActions.setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    authControllerSignOut: build.mutation<
      AuthControllerSignOutApiResponse,
      AuthControllerSignOutApiArg
    >({
      query: () => ({ url: `/auth/sign-out`, method: "POST" }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userActions.setUser(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    authControllerGetSesssionInfo: build.query<
      AuthControllerGetSesssionInfoApiResponse,
      AuthControllerGetSesssionInfoApiArg
    >({
      query: () => ({ url: `/auth/session` }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userActions.setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),

  overrideExisting: false,
});
export { injectedRtkApi as defaultApi };

export const {
  // users
  useUsersControllerCreateMutation,
  useUsersControllerFindAllQuery,
  useUsersControllerFindOneQuery,
  useUsersControllerUpdateMutation,
  useUsersControllerRemoveMutation,
  // users

  // products
  useProductsControllerCreateMutation,
  useProductsControllerFindAllQuery,
  useProductsControllerFindOneQuery,
  useProductsControllerUpdateMutation,
  useProductsControllerRemoveMutation,
  // products

  // types
  useTypesControllerCreateMutation,
  useTypesControllerFindAllQuery,
  useTypesControllerFindOneQuery,
  useTypesControllerUpdateMutation,
  useTypesControllerRemoveMutation,
  // types

  // images
  useImagesControllerCreateMutation,
  // images

  // carts
  useCartsControllerCreateMutation,
  useCartsControllerFindAllQuery,
  useCartsControllerFindOneQuery,
  useCartsControllerUpdateMutation,
  useCartsControllerRemoveMutation,
  useCartsControllerClearMutation,
  // carts

  // orders
  useOrdersControllerCreateMutation,
  useOrdersControllerFindAllQuery,
  useOrdersControllerFindOneQuery,
  useOrdersControllerUpdateMutation,
  useOrdersControllerRemoveMutation,
  // orders

  // cartsProducts
  useCartsProductsControllerCreateMutation,
  useCartsProductsControllerFindAllQuery,
  useCartsProductsControllerFindOneQuery,
  useCartsProductsControllerUpdateMutation,
  useCartsProductsControllerRemoveMutation,
  // cartsProducts

  // auth
  useAuthControllerSignUpMutation,
  useAuthControllerSignInMutation,
  useAuthControllerSignOutMutation,
  useAuthControllerGetSesssionInfoQuery,
  // auth
} = injectedRtkApi;
