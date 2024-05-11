import { RouteProps } from "react-router-dom";

import { AccountPage } from "pages/AccountPage";
import { AdminPanelPage } from "pages/AdminPanelPage";
import { CartPage } from "pages/CartPage";
import { CatalogItemPage } from "pages/CatalogItemPage";
import { CatalogPage } from "pages/CatalogPage";
import { CertainProductByIdPage } from "pages/CertainProductByIdPage";
import { ForbiddenPage } from "pages/ForbiddenPage";
import { MainPage } from "pages/MainPage";
import { OrdersPage } from "pages/OrdersPage";

import { LazyLoadChunk } from "components/LazyLoadChunk/LazyLoadChunk";

export type TAppRouteProps = RouteProps & {
  authOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  MAIN = "main",
  CERTAIN_PRODUCT_BY_ID_IN_MAIN = "certain_product_by_id_in_main",
  ACCOUNT = "account",
  CATALOG = "catalog",
  CATALOG_ITEM = "catalog_item",
  CERTAIN_PRODUCT_BY_ID_IN_CATALOG_ITEM = "certain_product_by_id_in_catalog_item",
  CART = "cart",
  ORDERS = "orders",
  ADMIN_PANEL = "admin_panel",
  FORBIDDEN = "forbidden",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.CERTAIN_PRODUCT_BY_ID_IN_MAIN]: "/:id",
  [AppRoutes.ACCOUNT]: "/account",
  [AppRoutes.CATALOG]: "/catalog",
  [AppRoutes.CATALOG_ITEM]: "/catalog/:url",
  [AppRoutes.CERTAIN_PRODUCT_BY_ID_IN_CATALOG_ITEM]: "/catalog/:url/:id",
  [AppRoutes.CART]: "/cart",
  [AppRoutes.ORDERS]: "/orders",
  [AppRoutes.ADMIN_PANEL]: "/admin_panel",
  [AppRoutes.FORBIDDEN]: "/forbidden",
};

export const routeConfig: Record<AppRoutes, TAppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: RouterPath.main,
    element: (
      <LazyLoadChunk>
        <MainPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.CERTAIN_PRODUCT_BY_ID_IN_MAIN]: {
    path: RouterPath.certain_product_by_id_in_main,
    element: (
      <LazyLoadChunk>
        <CertainProductByIdPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.ACCOUNT]: {
    path: RouterPath.account,
    element: (
      <LazyLoadChunk>
        <AccountPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
  [AppRoutes.CATALOG]: {
    path: RouterPath.catalog,
    element: (
      <LazyLoadChunk>
        <CatalogPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.CATALOG_ITEM]: {
    path: RouterPath.catalog_item,
    element: (
      <LazyLoadChunk>
        <CatalogItemPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.CERTAIN_PRODUCT_BY_ID_IN_CATALOG_ITEM]: {
    path: RouterPath.certain_product_by_id_in_catalog_item,
    element: (
      <LazyLoadChunk>
        <CertainProductByIdPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.CART]: {
    path: RouterPath.cart,
    element: (
      <LazyLoadChunk>
        <CartPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.ORDERS]: {
    path: RouterPath.orders,
    element: (
      <LazyLoadChunk>
        <OrdersPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: RouterPath.admin_panel,
    element: (
      <LazyLoadChunk>
        <AdminPanelPage />
      </LazyLoadChunk>
    ),
    // authOnly: true,
  },
  [AppRoutes.FORBIDDEN]: {
    path: RouterPath.forbidden,
    element: (
      <LazyLoadChunk>
        <ForbiddenPage />
      </LazyLoadChunk>
    ),
  },
};
