import { AppRouter } from "./components/AppRouter/AppRouter";
import { Navbar } from "./components/Navbar/Navbar";
import { Page } from "./components/Page/Page";
import { DynamicBreadCrumb } from "./components/DynamicBreadCrumb/DynamicBreadCrumb";
import React from "react";
import { useActions } from "./hooks/use-actionts";
import { useGetAuthUserQuery } from "./store/api/auth/auth-api";

export const App = () => {
  const { data: userData } = useGetAuthUserQuery();
  const { setUser } = useActions();

  React.useEffect(() => {
    setUser(userData);
  }, [setUser, userData]);

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
