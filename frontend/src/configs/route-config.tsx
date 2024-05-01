import { RouteProps } from "react-router-dom";

import { AccountPage } from "pages/AccountPage";
import { AdminPanelPage } from "pages/AdminPanelPage";
import { CartPage } from "pages/CartPage";
import { CatalogItemPage } from "pages/CatalogItemPage";
import { CatalogPage } from "pages/CatalogPage";
import { ForbiddenPage } from "pages/ForbiddenPage";
import { MainPage } from "pages/MainPage";
import { ProductsItemPage } from "pages/ProductsItemPage";

export type TAppRouteProps = RouteProps & {
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
  ADMIN_PANEL = "admin_panel",
  FORBIDDEN = "forbidden",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ACCOUNT]: "/account",
  [AppRoutes.CATALOG]: "/catalog",
  [AppRoutes.CATALOG_ITEM]: "/catalog/:url",
  [AppRoutes.PRODUCT_ITEM]: "/catalog/:url/:id",
  [AppRoutes.CART]: "/cart",
  [AppRoutes.ADMIN_PANEL]: "/admin_panel",
  [AppRoutes.FORBIDDEN]: "/forbidden",
};

export const routeConfig: Record<AppRoutes, TAppRouteProps> = {
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
  [AppRoutes.ADMIN_PANEL]: {
    path: RouterPath.admin_panel,
    element: <AdminPanelPage />,
    authOnly: true,
  },
  [AppRoutes.FORBIDDEN]: {
    path: RouterPath.forbidden,
    element: <ForbiddenPage />,
  },
};
