import { RouteProps } from "react-router-dom";
import { RegisterPage } from "../../pages/RegisterPage";
import { MainPage } from "../../pages/MainPage";
import { AccountPage } from "../../pages/AccountPage";
import { LoginPage } from "../../pages/LoginPage";
import { PeoplesPage } from "../../pages/PeoplesPage";

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  MAIN = "main",
  REGISTER = "register",
  LOGIN = "login",
  ACCOUNT = "account",
  PEOPLES = 'peoples'
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.REGISTER]: "/register",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.ACCOUNT]: "/account",
  [AppRoutes.PEOPLES]: '/peoples'
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: RouterPath.main,
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.REGISTER]: {
    path: RouterPath.register,
    element: <RegisterPage />,
  },
  [AppRoutes.LOGIN]: {
    path: RouterPath.login,
    element: <LoginPage />,
  },
  [AppRoutes.ACCOUNT]: {
    path: RouterPath.account,
    element: <AccountPage />,
    authOnly: true,
  },
  [AppRoutes.PEOPLES]: {
    path: RouterPath.peoples,
    element: <PeoplesPage />,
    authOnly: true,
  },
};
