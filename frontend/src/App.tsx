import { AppRouter } from "components/AppRouter/AppRouter";
import { DynamicBreadCrumb } from "components/DynamicBreadCrumb/DynamicBreadCrumb";
import { Navbar } from "components/Navbar/Navbar";
import { PageLayout } from "components/PageLayout/PageLayout";

import { AppProviders } from "providers/AppProviders";

export const App = () => {
  return (
    <AppProviders>
      <Navbar />
      <PageLayout>
        <DynamicBreadCrumb />
        <AppRouter />
      </PageLayout>
    </AppProviders>
  );
};
