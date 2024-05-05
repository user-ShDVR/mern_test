import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { authApi } from "store/api/auth/auth-api";
import { cartsApi } from "store/api/carts/carts-api";
import { cartsProductsApi } from "store/api/cartsProducts/carts-products-api";
import { imagesApi } from "store/api/images/images-api";
import { ordersApi } from "store/api/orders/orders-api";
import { productsApi } from "store/api/products/products-api";
import { typesApi } from "store/api/types/types-api";
import { usersApi } from "store/api/users/users-api";
import orderReducer from "store/features/orderSlice";
import userReducer from "store/features/userSlice";

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
    orderState: orderReducer,
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
