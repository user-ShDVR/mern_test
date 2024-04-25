// import { userActions } from "../features/userSlice";
// import { createRtkApi as api } from "./createRtkApi";
// const injectedRtkApi = api.injectEndpoints({
//   endpoints: (build) => ({
//     usersControllerCreate: build.mutation<
//       UsersControllerCreateApiResponse,
//       UsersControllerCreateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/users`,
//         method: "POST",
//         body: queryArg.createUserDto,
//       }),
//     }),
//     usersControllerFindAll: build.query<
//       UsersControllerFindAllApiResponse,
//       UsersControllerFindAllApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/users`,
//         params: { page: queryArg.page, limit: queryArg.limit },
//       }),
//     }),
//     usersControllerFindOne: build.query<
//       UsersControllerFindOneApiResponse,
//       UsersControllerFindOneApiArg
//     >({
//       query: (queryArg) => ({ url: `/users/${queryArg.id}` }),
//     }),
//     usersControllerUpdate: build.mutation<
//       UsersControllerUpdateApiResponse,
//       UsersControllerUpdateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/users/${queryArg.id}`,
//         method: "PATCH",
//         body: queryArg.updateUserDto,
//       }),
//     }),
//     usersControllerRemove: build.mutation<
//       UsersControllerRemoveApiResponse,
//       UsersControllerRemoveApiArg
//     >({
//       query: (queryArg) => ({ url: `/users/${queryArg.id}`, method: "DELETE" }),
//     }),
//     productsControllerCreate: build.mutation<
//       ProductsControllerCreateApiResponse,
//       ProductsControllerCreateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/products`,
//         method: "POST",
//         body: queryArg.createProductDto,
//       }),
//     }),
//     productsControllerFindAll: build.query<
//       ProductsControllerFindAllApiResponse,
//       ProductsControllerFindAllApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/products`,
//         params: {
//           page: queryArg.page,
//           limit: queryArg.limit,
//           minPrice: queryArg.minPrice,
//           maxPrice: queryArg.maxPrice,
//           sortBy: queryArg.sortBy,
//           sortOrder: queryArg.sortOrder,
//           type: queryArg["type"],
//         },
//       }),
//     }),
//     productsControllerFindOne: build.query<
//       ProductsControllerFindOneApiResponse,
//       ProductsControllerFindOneApiArg
//     >({
//       query: (queryArg) => ({ url: `/products/${queryArg.id}` }),
//     }),
//     productsControllerUpdate: build.mutation<
//       ProductsControllerUpdateApiResponse,
//       ProductsControllerUpdateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/products/${queryArg.id}`,
//         method: "PATCH",
//         body: queryArg.updateProductDto,
//       }),
//     }),
//     productsControllerRemove: build.mutation<
//       ProductsControllerRemoveApiResponse,
//       ProductsControllerRemoveApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/products/${queryArg.id}`,
//         method: "DELETE",
//       }),
//     }),
//     typesControllerCreate: build.mutation<
//       TypesControllerCreateApiResponse,
//       TypesControllerCreateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/types`,
//         method: "POST",
//         body: queryArg.createTypeDto,
//       }),
//     }),
//     typesControllerFindAll: build.query<
//       TypesControllerFindAllApiResponse,
//       TypesControllerFindAllApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/types`,
//         params: { page: queryArg.page, limit: queryArg.limit },
//       }),
//     }),
//     typesControllerFindOne: build.query<
//       TypesControllerFindOneApiResponse,
//       TypesControllerFindOneApiArg
//     >({
//       query: (queryArg) => ({ url: `/types/${queryArg.id}` }),
//     }),
//     typesControllerUpdate: build.mutation<
//       TypesControllerUpdateApiResponse,
//       TypesControllerUpdateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/types/${queryArg.id}`,
//         method: "PATCH",
//         body: queryArg.updateTypeDto,
//       }),
//     }),
//     typesControllerRemove: build.mutation<
//       TypesControllerRemoveApiResponse,
//       TypesControllerRemoveApiArg
//     >({
//       query: (queryArg) => ({ url: `/types/${queryArg.id}`, method: "DELETE" }),
//     }),
//     imagesControllerCreate: build.mutation<
//       ImagesControllerCreateApiResponse,
//       ImagesControllerCreateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/images`,
//         method: "POST",
//         body: queryArg.body,
//       }),
//     }),
//     cartsControllerCreate: build.mutation<
//       CartsControllerCreateApiResponse,
//       CartsControllerCreateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/carts`,
//         method: "POST",
//         body: queryArg.createCartDto,
//       }),
//     }),
//     cartsControllerFindAll: build.query<
//       CartsControllerFindAllApiResponse,
//       CartsControllerFindAllApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/carts`,
//         params: { page: queryArg.page, limit: queryArg.limit },
//       }),
//     }),
//     cartsControllerFindOne: build.query<
//       CartsControllerFindOneApiResponse,
//       CartsControllerFindOneApiArg
//     >({
//       query: (queryArg) => ({ url: `/carts/${queryArg.id}` }),
//     }),
//     cartsControllerUpdate: build.mutation<
//       CartsControllerUpdateApiResponse,
//       CartsControllerUpdateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/carts/${queryArg.id}`,
//         method: "PATCH",
//         body: queryArg.updateCartDto,
//       }),
//     }),
//     cartsControllerRemove: build.mutation<
//       CartsControllerRemoveApiResponse,
//       CartsControllerRemoveApiArg
//     >({
//       query: (queryArg) => ({ url: `/carts/${queryArg.id}`, method: "DELETE" }),
//     }),
//     cartsControllerClear: build.mutation<
//       CartsControllerClearApiResponse,
//       CartsControllerClearApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/carts/${queryArg.id}/clear`,
//         method: "POST",
//       }),
//     }),
//     ordersControllerCreate: build.mutation<
//       OrdersControllerCreateApiResponse,
//       OrdersControllerCreateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/orders`,
//         method: "POST",
//         body: queryArg.createOrderDto,
//       }),
//     }),
//     ordersControllerFindAll: build.query<
//       OrdersControllerFindAllApiResponse,
//       OrdersControllerFindAllApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/orders`,
//         params: { page: queryArg.page, limit: queryArg.limit },
//       }),
//     }),
//     ordersControllerFindOne: build.query<
//       OrdersControllerFindOneApiResponse,
//       OrdersControllerFindOneApiArg
//     >({
//       query: (queryArg) => ({ url: `/orders/${queryArg.id}` }),
//     }),
//     ordersControllerUpdate: build.mutation<
//       OrdersControllerUpdateApiResponse,
//       OrdersControllerUpdateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/orders/${queryArg.id}`,
//         method: "PATCH",
//         body: queryArg.updateOrderDto,
//       }),
//     }),
//     ordersControllerRemove: build.mutation<
//       OrdersControllerRemoveApiResponse,
//       OrdersControllerRemoveApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/orders/${queryArg.id}`,
//         method: "DELETE",
//       }),
//     }),
//     cartsProductsControllerCreate: build.mutation<
//       CartsProductsControllerCreateApiResponse,
//       CartsProductsControllerCreateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/carts-products`,
//         method: "POST",
//         body: queryArg.createCartsProductDto,
//       }),
//     }),
//     cartsProductsControllerFindAll: build.query<
//       CartsProductsControllerFindAllApiResponse,
//       CartsProductsControllerFindAllApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/carts-products`,
//         params: { page: queryArg.page, limit: queryArg.limit },
//       }),
//     }),
//     cartsProductsControllerRemove: build.mutation<
//       CartsProductsControllerRemoveApiResponse,
//       CartsProductsControllerRemoveApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/carts-products?product_id=${queryArg.product_id}&user_id=${queryArg.user_id}`,
//         method: "DELETE",
//       }),
//     }),
//     cartsProductsControllerFindOne: build.query<
//       CartsProductsControllerFindOneApiResponse,
//       CartsProductsControllerFindOneApiArg
//     >({
//       query: (queryArg) => ({ url: `/carts-products/${queryArg.id}` }),
//     }),
//     cartsProductsControllerUpdate: build.mutation<
//       CartsProductsControllerUpdateApiResponse,
//       CartsProductsControllerUpdateApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/carts-products/${queryArg.id}`,
//         method: "PATCH",
//         body: queryArg.updateCartsProductDto,
//       }),
//     }),
//     authControllerSignUp: build.mutation<
//       AuthControllerSignUpApiResponse,
//       AuthControllerSignUpApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/auth/sign-up`,
//         method: "POST",
//         body: queryArg.signUpDto,
//       }),
//       async onQueryStarted(args, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(userActions.setUser(data));
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//     authControllerSignIn: build.mutation<
//       AuthControllerSignInApiResponse,
//       AuthControllerSignInApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/auth/sign-in`,
//         method: "POST",
//         body: queryArg.signInDto,
//       }),
//       async onQueryStarted(args, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(userActions.setUser(data));
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//     authControllerSignOut: build.mutation<
//       AuthControllerSignOutApiResponse,
//       AuthControllerSignOutApiArg
//     >({
//       query: () => ({ url: `/auth/sign-out`, method: "POST" }),
//       async onQueryStarted(args, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled;
//           dispatch(userActions.setUser(null));
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//     authControllerGetSesssionInfo: build.query<
//       AuthControllerGetSesssionInfoApiResponse,
//       AuthControllerGetSesssionInfoApiArg
//     >({
//       query: () => ({ url: `/auth/session` }),
//       async onQueryStarted(args, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(userActions.setUser(data));
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//   }),
//   overrideExisting: false,
// });
// export { injectedRtkApi as defaultApi };
// export type UsersControllerCreateApiResponse = unknown;
// export type UsersControllerCreateApiArg = {
//   createUserDto: CreateUserDto;
// };
// export type UsersControllerFindAllApiResponse = unknown;
// export type UsersControllerFindAllApiArg = {
//   page: number;
//   limit: number;
// };
// export type UsersControllerFindOneApiResponse = unknown;
// export type UsersControllerFindOneApiArg = {
//   id: string;
// };
// export type UsersControllerUpdateApiResponse = unknown;
// export type UsersControllerUpdateApiArg = {
//   id: string;
//   updateUserDto: UpdateUserDto;
// };
// export type UsersControllerRemoveApiResponse = unknown;
// export type UsersControllerRemoveApiArg = {
//   id: string;
// };
// export type ProductsControllerCreateApiResponse = unknown;
// export type ProductsControllerCreateApiArg = {
//   createProductDto: CreateProductDto;
// };
// export type ProductsControllerFindAllApiResponse = unknown;
// export type ProductsControllerFindAllApiArg = {
//   page: number;
//   limit: number;
//   minPrice: number;
//   maxPrice: number;
//   sortBy: string;
//   sortOrder: string;
//   type: string;
// };
// export type ProductsControllerFindOneApiResponse = unknown;
// export type ProductsControllerFindOneApiArg = {
//   id: string;
// };
// export type ProductsControllerUpdateApiResponse = unknown;
// export type ProductsControllerUpdateApiArg = {
//   id: string;
//   updateProductDto: UpdateProductDto;
// };
// export type ProductsControllerRemoveApiResponse = unknown;
// export type ProductsControllerRemoveApiArg = {
//   id: string;
// };
// export type TypesControllerCreateApiResponse = unknown;
// export type TypesControllerCreateApiArg = {
//   createTypeDto: CreateTypeDto;
// };
// export type TypesControllerFindAllApiResponse = unknown;
// export type TypesControllerFindAllApiArg = {
//   page: number;
//   limit: number;
// };
// export type TypesControllerFindOneApiResponse = unknown;
// export type TypesControllerFindOneApiArg = {
//   id: string;
// };
// export type TypesControllerUpdateApiResponse = unknown;
// export type TypesControllerUpdateApiArg = {
//   id: string;
//   updateTypeDto: UpdateTypeDto;
// };
// export type TypesControllerRemoveApiResponse = unknown;
// export type TypesControllerRemoveApiArg = {
//   id: string;
// };
// export type ImagesControllerCreateApiResponse = unknown;
// export type ImagesControllerCreateApiArg = {
//   body: {
//     file?: Blob;
//   };
// };
// export type CartsControllerCreateApiResponse = unknown;
// export type CartsControllerCreateApiArg = {
//   createCartDto: CreateCartDto;
// };
// export type CartsControllerFindAllApiResponse = unknown;
// export type CartsControllerFindAllApiArg = {
//   page: number;
//   limit: number;
// };
// export type CartsControllerFindOneApiResponse = unknown;
// export type CartsControllerFindOneApiArg = {
//   id: string;
// };
// export type CartsControllerUpdateApiResponse = unknown;
// export type CartsControllerUpdateApiArg = {
//   id: string;
//   updateCartDto: UpdateCartDto;
// };
// export type CartsControllerRemoveApiResponse = unknown;
// export type CartsControllerRemoveApiArg = {
//   id: string;
// };
// export type CartsControllerClearApiResponse = unknown;
// export type CartsControllerClearApiArg = {
//   id: string;
// };
// export type OrdersControllerCreateApiResponse = unknown;
// export type OrdersControllerCreateApiArg = {
//   createOrderDto: CreateOrderDto;
// };
// export type OrdersControllerFindAllApiResponse = unknown;
// export type OrdersControllerFindAllApiArg = {
//   page: number;
//   limit: number;
// };
// export type OrdersControllerFindOneApiResponse = unknown;
// export type OrdersControllerFindOneApiArg = {
//   id: string;
// };
// export type OrdersControllerUpdateApiResponse = unknown;
// export type OrdersControllerUpdateApiArg = {
//   id: string;
//   updateOrderDto: UpdateOrderDto;
// };
// export type OrdersControllerRemoveApiResponse = unknown;
// export type OrdersControllerRemoveApiArg = {
//   id: string;
// };
// export type CartsProductsControllerCreateApiResponse = unknown;
// export type CartsProductsControllerCreateApiArg = {
//   createCartsProductDto: CreateCartsProductDto;
// };
// export type CartsProductsControllerFindAllApiResponse = unknown;
// export type CartsProductsControllerFindAllApiArg = {
//   page: number;
//   limit: number;
// };
// export type CartsProductsControllerRemoveApiResponse = unknown;
// export type CartsProductsControllerRemoveApiArg = {
//   product_id: number;
//   user_id: number;
// };
// export type CartsProductsControllerFindOneApiResponse = unknown;
// export type CartsProductsControllerFindOneApiArg = {
//   id: string;
// };
// export type CartsProductsControllerUpdateApiResponse = unknown;
// export type CartsProductsControllerUpdateApiArg = {
//   id: string;
//   updateCartsProductDto: UpdateCartsProductDto;
// };
// export type AuthControllerSignUpApiResponse =
//   /** status 201  */ UserResponseDto;
// export type AuthControllerSignUpApiArg = {
//   signUpDto: SignUpDto;
// };
// export type AuthControllerSignInApiResponse = unknown;
// export type AuthControllerSignInApiArg = {
//   signInDto: SignInDto;
// };
// export type AuthControllerSignOutApiResponse = unknown;
// export type AuthControllerSignOutApiArg = void;
// export type AuthControllerGetSesssionInfoApiResponse =
//   /** status 200  */ UserResponseDto;
// export type AuthControllerGetSesssionInfoApiArg = void;
// export type CreateUserDto = {
//   email: string;
//   hash: string;
//   salt: string;
//   surname: string;
//   name: string;
//   lastname: string;
// };
// export type UpdateUserDto = {
//   email?: string;
//   hash?: string;
//   salt?: string;
//   surname?: string;
//   name?: string;
//   lastname?: string;
// };
// export type CreateProductDto = {
//   name: string;
//   description: string;
//   characteristics: string[];
//   price: number;
//   image_id: number;
//   type_id: number;
// };
// export type UpdateProductDto = {
//   name?: string;
//   description?: string;
//   characteristics?: string[];
//   price?: number;
//   image_id?: number;
//   type_id?: number;
// };
// export type CreateTypeDto = {
//   name: string;
//   image_id: number;
//   url: string;
// };
// export type UpdateTypeDto = {
//   name?: string;
//   image_id?: number;
//   url?: string;
// };
// export type CreateCartDto = {
//   user_id: number;
// };
// export type UpdateCartDto = {
//   user_id?: number;
// };
// export type CreateOrderDto = {
//   user_id: number;
//   products_id: number;
//   quantity: number;
//   summary: number;
// };
// export type UpdateOrderDto = {
//   user_id?: number;
//   products_id?: number;
//   quantity?: number;
//   summary?: number;
// };
// export type CreateCartsProductDto = {
//   cart_id: number;
//   product_id: number;
//   quantity: number;
// };
// export type UpdateCartsProductDto = {
//   cart_id?: number;
//   product_id?: number;
//   quantity?: number;
// };
// export type UserResponseDto = {
//   id: number;
//   email: string;
//   surname: string;
//   name: string;
//   lastname: string;
//   role: string;
// };
// export type SignUpDto = {
//   email: string;
//   password: string;
//   surname: string;
//   name: string;
//   lastname: string;
// };
// export type SignInDto = {
//   email: string;
//   password: string;
// };
// export const {
//   useUsersControllerCreateMutation,
//   useUsersControllerFindAllQuery,
//   useUsersControllerFindOneQuery,
//   useUsersControllerUpdateMutation,
//   useUsersControllerRemoveMutation,
//   useProductsControllerCreateMutation,
//   useProductsControllerFindAllQuery,
//   useProductsControllerFindOneQuery,
//   useProductsControllerUpdateMutation,
//   useProductsControllerRemoveMutation,
//   useTypesControllerCreateMutation,
//   useTypesControllerFindAllQuery,
//   useTypesControllerFindOneQuery,
//   useTypesControllerUpdateMutation,
//   useTypesControllerRemoveMutation,
//   useImagesControllerCreateMutation,
//   useCartsControllerCreateMutation,
//   useCartsControllerFindAllQuery,
//   useCartsControllerFindOneQuery,
//   useCartsControllerUpdateMutation,
//   useCartsControllerRemoveMutation,
//   useCartsControllerClearMutation,
//   useOrdersControllerCreateMutation,
//   useOrdersControllerFindAllQuery,
//   useOrdersControllerFindOneQuery,
//   useOrdersControllerUpdateMutation,
//   useOrdersControllerRemoveMutation,
//   useCartsProductsControllerCreateMutation,
//   useCartsProductsControllerFindAllQuery,
//   useCartsProductsControllerRemoveMutation,
//   useCartsProductsControllerFindOneQuery,
//   useCartsProductsControllerUpdateMutation,
//   useAuthControllerSignUpMutation,
//   useAuthControllerSignInMutation,
//   useAuthControllerSignOutMutation,
//   useAuthControllerGetSesssionInfoQuery,
// } = injectedRtkApi;
