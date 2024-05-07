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
    element: <MainPage />,
  },
  [AppRoutes.CERTAIN_PRODUCT_BY_ID_IN_MAIN]: {
    path: RouterPath.certain_product_by_id_in_main,
    element: <CertainProductByIdPage />,
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
  [AppRoutes.CERTAIN_PRODUCT_BY_ID_IN_CATALOG_ITEM]: {
    path: RouterPath.certain_product_by_id_in_catalog_item,
    element: <CertainProductByIdPage />,
  },
  [AppRoutes.CART]: {
    path: RouterPath.cart,
    element: <CartPage />,
  },
  [AppRoutes.ORDERS]: {
    path: RouterPath.orders,
    element: <OrdersPage />,
    authOnly: true,
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
