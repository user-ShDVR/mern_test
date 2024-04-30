import { AppRouter } from "components/AppRouter/AppRouter";
import { DynamicBreadCrumb } from "components/DynamicBreadCrumb/DynamicBreadCrumb";
import { Navbar } from "components/Navbar/Navbar";
import { Page } from "components/Page/Page";

import { useGetUser } from "hooks/user/use-get-user";

export const App = () => {
  useGetUser();

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
