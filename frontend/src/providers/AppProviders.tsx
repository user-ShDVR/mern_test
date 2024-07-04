import { CatalogCategoryProvider } from "./CatalogCategoryProvider";
import { SearchDataProvider } from "./SearchDataProvider";

interface IAppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = (props: IAppProvidersProps) => {
  const { children } = props;

  return (
    <SearchDataProvider>
      <CatalogCategoryProvider>{children}</CatalogCategoryProvider>
    </SearchDataProvider>
  );
};
