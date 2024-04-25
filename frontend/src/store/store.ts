import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { authApi } from "./api/auth/auth-api";
import { cartsProductsApi } from "./api/cartsProducts/carts-products-api";
import { ordersApi } from "./api/orders/orders-api";
import { cartsApi } from "./api/carts/carts-api";
import { imagesApi } from "./api/images/images-api";
import { typesApi } from "./api/types/types-api";
import { productsApi } from "./api/products/products-api";
import { usersApi } from "./api/users/users-api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [cartsProductsApi.reducerPath]: cartsProductsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [cartsApi.reducerPath]: cartsApi.reducer,
    [imagesApi.reducerPath]: imagesApi.reducer,
    [typesApi.reducerPath]: typesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    userState: userReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      usersApi.middleware,
      authApi.middleware,
      cartsProductsApi.middleware,
      ordersApi.middleware,
      cartsApi.middleware,
      imagesApi.middleware,
      typesApi.middleware,
      productsApi.middleware,
    ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
