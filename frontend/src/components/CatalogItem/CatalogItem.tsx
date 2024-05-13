import React from "react";

import { Button, Typography } from "antd";
import { useSelector } from "react-redux";

import { AdaptiveDrawer } from "components/AdaptiveDrawer/AdaptiveDrawer";
import { ProductCardsList } from "components/ProductCardsList/ProductCardsList";

import { useGetProductsQuery } from "store/api/products/products-api";
import { selectCategoryInfo } from "store/features/categoryInfoSlice";

import { PRODUCTS_COUNT_IN_CATALOG_ITEM_PAGE } from "constants/products-constants";

import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";
import { useGetProductsFilters } from "hooks/products/use-get-products-filters";
import { useSearchProducts } from "hooks/products/use-search-products";

import styles from "./CatalogItem.module.scss";

export const CatalogItem = () => {
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const { currentPage, PaginationBlock } = useGetPaginationBlock();
  const { searchValue } = useSearchProducts();

  const { categoryTypeName, categoryTypeUrl } = useSelector(selectCategoryInfo);

  const { FiltersAside, minValue, maxValue, sortOrder, sortBy } =
    useGetProductsFilters();

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const { data: productsData } = useGetProductsQuery({
    page: currentPage,
    limit: PRODUCTS_COUNT_IN_CATALOG_ITEM_PAGE,
    minPrice: minValue,
    maxPrice: maxValue,
    type: categoryTypeUrl,
    sortBy,
    sortOrder,
    searchValue,
  });

  const isEmptyProductsData = productsData?.products.length === 0;

  return (
    <>
      <Typography.Title>{categoryTypeName}</Typography.Title>

      <Button
        className={styles.openFiltersMobileButton}
        type="primary"
        onClick={handleOpenDrawer}
      >
        Фильтры
      </Button>

      <AdaptiveDrawer
        title="Фильтры"
        drawerPlacement="right"
        handleCloseDrawer={handleCloseDrawer}
        isOpenDrawer={isOpenDrawer}
        customWindowWidth={1200}
      >
        {FiltersAside}
      </AdaptiveDrawer>

      <div className={styles.catalogItemWrapper}>
        <div className={styles.filtersWrapper}>{FiltersAside}</div>
        <ProductCardsList productsData={productsData?.products} />
      </div>

      {!isEmptyProductsData && (
        <PaginationBlock
          countElementsOnPage={PRODUCTS_COUNT_IN_CATALOG_ITEM_PAGE}
          totalCount={productsData?.totalCount}
        />
      )}
    </>
  );
};
