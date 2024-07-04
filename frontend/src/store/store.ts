import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import { authApi } from "store/api/auth/auth-api";
import { cartsApi } from "store/api/carts/carts-api";
import { cartsProductsApi } from "store/api/cartsProducts/carts-products-api";
import { imagesApi } from "store/api/images/images-api";
import { ordersApi } from "store/api/orders/orders-api";
import { productsApi } from "store/api/products/products-api";
import { typesApi } from "store/api/types/types-api";
import { usersApi } from "store/api/users/users-api";

import { searchApi } from "./api/search/search-api";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [cartsApi.reducerPath]: cartsApi.reducer,
  [cartsProductsApi.reducerPath]: cartsProductsApi.reducer,
  [imagesApi.reducerPath]: imagesApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [typesApi.reducerPath]: typesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        authApi.middleware,
        cartsApi.middleware,
        cartsProductsApi.middleware,
        ordersApi.middleware,
        imagesApi.middleware,
        typesApi.middleware,
        productsApi.middleware,
        usersApi.middleware,
        searchApi.middleware,
      ]),
  });
};

export const store = setupStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
