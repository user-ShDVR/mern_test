import React from "react";

import { CatalogCategoryContext } from "providers/CatalogCategoryProvider";
import { SearchDataContext } from "providers/SearchDataProvider";

export const useContexts = () => {
  const searchDataContext = React.useContext(SearchDataContext);
  const catalogCategoryContext = React.useContext(CatalogCategoryContext);

  return {
    searchDataContext,
    catalogCategoryContext,
  };
};
