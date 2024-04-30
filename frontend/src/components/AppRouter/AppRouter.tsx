import React from "react";

import { Routes, Route } from "react-router-dom";

import { AppRouteProps, routeConfig } from "configs/route-config";

import { RequireAuth } from "./RequireAuth";

export const AppRouter = () => {
  const renderWithWrapper = React.useCallback((route: AppRouteProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth>{route.element}</RequireAuth>
          ) : (
            route.element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};
