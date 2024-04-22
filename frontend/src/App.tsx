import React from "react";
import { AppRouter } from "./components/AppRouter/AppRouter";
import { useSelector } from "react-redux";
import { selectUser } from "./store/features/userSlice";
import { Navbar } from "./components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "./components/AppRouter/routeConfig";
import { useAuthControllerGetSesssionInfoQuery } from "./store/api/defaultApi";
import { Page } from "./components/Page/Page";
import { DynamicBreadCrumb } from "./DynamicBreadCrumb/DynamicBreadCrumb";

export const App = () => {
  const navigate = useNavigate();
  const { isLoading, isError } = useAuthControllerGetSesssionInfoQuery();
  const { user } = useSelector(selectUser);

  React.useEffect(() => {
    if ((!isLoading && !user) || isError) {
      navigate(RouterPath.main);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Page>
        <DynamicBreadCrumb />
        <AppRouter />
      </Page>
    </>
  );
};
