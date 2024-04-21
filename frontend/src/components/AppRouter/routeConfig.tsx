import { RouteProps } from "react-router-dom";
import { MainPage } from "../../pages/MainPage";
import { AccountPage } from "../../pages/AccountPage";
import { CatalogPage } from "../../pages/CatalogPage";

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  MAIN = "main",
  ACCOUNT = "account",
  CATALOG = "catalog",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ACCOUNT]: "/account",
  [AppRoutes.CATALOG]: "/catalog",
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
};
