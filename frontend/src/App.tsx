import { AppRouter } from "components/AppRouter/AppRouter";
import { DynamicBreadCrumb } from "components/DynamicBreadCrumb/DynamicBreadCrumb";
import { Navbar } from "components/Navbar/Navbar";
import { PageLayout } from "components/PageLayout/PageLayout";

export const App = () => {
  return (
    <>
      <Navbar />
      <PageLayout>
        <DynamicBreadCrumb />
        <AppRouter />
      </PageLayout>
    </>
  );
};
