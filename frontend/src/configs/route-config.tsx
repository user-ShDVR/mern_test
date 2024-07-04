import { RouteProps } from "react-router-dom";

import { AccountPage } from "pages/AccountPage";
import { AdminPanelPage } from "pages/AdminPanelPage";
import { CartPage } from "pages/CartPage";
import { CatalogItemPage } from "pages/CatalogItemPage";
import { CatalogPage } from "pages/CatalogPage";
import { ForbiddenPage } from "pages/ForbiddenPage";
import { MainPage } from "pages/MainPage";
import { NotAuthorizedPage } from "pages/NotAuthorizedPage";
import { OrdersPage } from "pages/OrdersPage";
import { ProductPage } from "pages/ProductPage";
import { SearchResultPage } from "pages/SearchResultPage";

import { LazyLoadChunk } from "components/LazyLoadChunk/LazyLoadChunk";

export type TAppRouteProps = RouteProps & {
  authOnly?: boolean;
  adminOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  MAIN = "main",
  PRODUCT = "product",
  ACCOUNT = "account",
  CATALOG = "catalog",
  CATALOG_ITEM = "catalog_item",
  CATALOG_ITEM_PRODUCT = "catalog_item_product",
  CART = "cart",
  ORDERS = "orders",
  ADMIN_PANEL = "admin_panel",
  SEARCH_RESULT = "search_result",
  FORBIDDEN = "forbidden",
  NOT_AUTHORIZED = "not_authorized",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.PRODUCT]: "/:id",
  [AppRoutes.ACCOUNT]: "/account",
  [AppRoutes.CATALOG]: "/catalog",
  [AppRoutes.CATALOG_ITEM]: "/catalog/:url",
  [AppRoutes.CATALOG_ITEM_PRODUCT]: "/catalog/:url/:id",
  [AppRoutes.CART]: "/cart",
  [AppRoutes.ORDERS]: "/orders",
  [AppRoutes.ADMIN_PANEL]: "/admin_panel",
  [AppRoutes.SEARCH_RESULT]: "/search_result",
  [AppRoutes.FORBIDDEN]: "/forbidden",
  [AppRoutes.NOT_AUTHORIZED]: "/not_authorized",
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
  [AppRoutes.PRODUCT]: {
    path: RouterPath.product,
    element: (
      <LazyLoadChunk>
        <ProductPage />
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
  [AppRoutes.CATALOG_ITEM_PRODUCT]: {
    path: RouterPath.catalog_item_product,
    element: (
      <LazyLoadChunk>
        <ProductPage />
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
    authOnly: true,
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
    authOnly: true,
    adminOnly: true,
  },
  [AppRoutes.SEARCH_RESULT]: {
    path: RouterPath.search_result,
    element: (
      <LazyLoadChunk>
        <SearchResultPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.FORBIDDEN]: {
    path: RouterPath.forbidden,
    element: (
      <LazyLoadChunk>
        <ForbiddenPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
  [AppRoutes.NOT_AUTHORIZED]: {
    path: RouterPath.not_authorized,
    element: (
      <LazyLoadChunk>
        <NotAuthorizedPage />
      </LazyLoadChunk>
    ),
  },
};
