import { RouteProps } from "react-router-dom";
import { MainPage } from "../../pages/MainPage";
import { AccountPage } from "../../pages/AccountPage";
import { CatalogPage } from "../../pages/CatalogPage";
import { CatalogItemPage } from "../../pages/CatalogItemPage";
import { ProductsItemPage } from "../../pages/ProductsItemPage";
import { CartPage } from "../../pages/CartPage";

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  MAIN = "main",
  ACCOUNT = "account",
  CATALOG = "catalog",
  CATALOG_ITEM = "catalog_item",
  PRODUCT_ITEM = "product_item",
  CART = "cart",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ACCOUNT]: "/account",
  [AppRoutes.CATALOG]: "/catalog",
  [AppRoutes.CATALOG_ITEM]: "/catalog/:url",
  [AppRoutes.PRODUCT_ITEM]: "/catalog/:url/:id",
  [AppRoutes.CART]: "/cart",
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: RouterPath.main,
    element: <MainPage />,
  },
  [AppRoutes.ACCOUNT]: {
    path: RouterPath.account,
    element: <AccountPage />,
    authOnly: true,
  },
  [AppRoutes.CATALOG]: {
    path: RouterPath.catalog,
    element: <CatalogPage />,
  },
  [AppRoutes.CATALOG_ITEM]: {
    path: RouterPath.catalog_item,
    element: <CatalogItemPage />,
  },
  [AppRoutes.PRODUCT_ITEM]: {
    path: RouterPath.product_item,
    element: <ProductsItemPage />,
  },
  [AppRoutes.CART]: {
    path: RouterPath.cart,
    element: <CartPage />,
  },
};
