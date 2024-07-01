import React from "react";

import { CurrentPageContext } from "providers/CurrentPageProvider";
import { SearchValueContext } from "providers/SearchValueProvider";

import { CatalogCategoryContext } from "./../../providers/CatalogCategoryProvider";

export const useContexts = () => {
  const currentPageContext = React.useContext(CurrentPageContext);
  const searchValueContext = React.useContext(SearchValueContext);
  const catalogCategoryContext = React.useContext(CatalogCategoryContext);

  return {
    currentPageContext,
    searchValueContext,
    catalogCategoryContext,
  };
};
