import { RouteProps } from "react-router-dom";

const AccountPage = React.lazy(() => import('pages/AccountPage'));

const AdminPanelPage = React.lazy(() => import('pages/AdminPanelPage'));

const CartPage = React.lazy(() => import('pages/CartPage'));

const CatalogItemPage = React.lazy(() => import('pages/CatalogItemPage'));

const CatalogPage = React.lazy(() => import('pages/CatalogPage'));

const CertainProductByIdPage = React.lazy(() => import('pages/CertainProductByIdPage'));

const ForbiddenPage = React.lazy(() => import('pages/ForbiddenPage'));

const MainPage = React.lazy(() => import('pages/MainPage'));

const OrdersPage = React.lazy(() => import('pages/OrdersPage'));
import React, { Suspense } from "react";
import { Spinner } from "components/Spinner/Spinner";

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
    element: <Suspense fallback={<Spinner />}><MainPage /></Suspense>,
  },
  [AppRoutes.CERTAIN_PRODUCT_BY_ID_IN_MAIN]: {
    path: RouterPath.certain_product_by_id_in_main,
    element: <Suspense fallback={<Spinner />}><CertainProductByIdPage /></Suspense>,
  },
  [AppRoutes.ACCOUNT]: {
    path: RouterPath.account,
    element: <Suspense fallback={<Spinner />}> <AccountPage /> </Suspense>,
    authOnly: true,
  },
  [AppRoutes.CATALOG]: {
    path: RouterPath.catalog,
    element: <Suspense fallback={<Spinner />}> <CatalogPage /> </Suspense>,
  },
  [AppRoutes.CATALOG_ITEM]: {
    path: RouterPath.catalog_item,
    element: <Suspense fallback={<Spinner />}> <CatalogItemPage /> </Suspense>,
  },
  [AppRoutes.CERTAIN_PRODUCT_BY_ID_IN_CATALOG_ITEM]: {
    path: RouterPath.certain_product_by_id_in_catalog_item,
    element: <Suspense fallback={<Spinner />}> <CertainProductByIdPage /> </Suspense>,
  },
  [AppRoutes.CART]: {
    path: RouterPath.cart,
    element: <Suspense fallback={<Spinner />}> <CartPage /> </Suspense>,
  },
  [AppRoutes.ORDERS]: {
    path: RouterPath.orders,
    element: <Suspense fallback={<Spinner />}> <OrdersPage /> </Suspense>,
    authOnly: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: RouterPath.admin_panel,
    element: <Suspense fallback={<Spinner />}> <AdminPanelPage /> </Suspense>,
    authOnly: true,
  },
  [AppRoutes.FORBIDDEN]: {
    path: RouterPath.forbidden,
    element: <Suspense fallback={<Spinner />}> <ForbiddenPage /> </Suspense>,
  },
};
