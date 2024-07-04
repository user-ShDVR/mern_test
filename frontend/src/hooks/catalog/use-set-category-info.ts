import { useContexts } from "hooks/general/use-contexts";

import { IType } from "types/IType";

export const useSetCategoryInfo = () => {
  const {
    catalogCategoryContext: {
      setCatalogCategoryTypeName,
      setCatalogCategoryTypeUrl,
    },
  } = useContexts();

  const handleSetCategoryInfo = (catalogElement: IType) => {
    setCatalogCategoryTypeName(catalogElement.name);
    setCatalogCategoryTypeUrl(catalogElement.url);
  };

  return { handleSetCategoryInfo };
};
