import { CatalogCategoryProvider } from "./CatalogCategoryProvider";
import { CurrentPageProvider } from "./CurrentPageProvider";
import { SearchValueProvider } from "./SearchValueProvider";

interface IAppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = (props: IAppProvidersProps) => {
  const { children } = props;

  return (
    <CurrentPageProvider>
      <SearchValueProvider>
        <CatalogCategoryProvider>{children}</CatalogCategoryProvider>
      </SearchValueProvider>
    </CurrentPageProvider>
  );
};
