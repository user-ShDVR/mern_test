import React from "react";

import { Button, Pagination, Typography } from "antd";

import { AdaptiveDrawer } from "components/AdaptiveDrawer/AdaptiveDrawer";
import { ProductCardsList } from "components/ProductCardsList/ProductCardsList";

import { useGetProductsQuery } from "store/api/products/products-api";

import { useContexts } from "hooks/general/use-contexts";
import { useGetProductsFilters } from "hooks/products/use-get-products-filters";

import styles from "./CatalogItem.module.scss";

export const CatalogItem = () => {
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const {
    catalogCategoryContext: { catalogCategoryTypeName, catalogCategoryTypeUrl },
  } = useContexts();

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
    limit: 3,
    minPrice: minValue,
    maxPrice: maxValue,
    type: catalogCategoryTypeUrl,
    sortBy,
    sortOrder,
  });

  const isEmptyProductsData = productsData?.products.length === 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Typography.Title>{catalogCategoryTypeName}</Typography.Title>

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
        <Pagination
          className={styles.catalogItemPaginationWrapper}
          pageSize={3}
          total={productsData?.totalCount}
          onChange={handlePageChange}
          current={currentPage}
        />
      )}
    </>
  );
};
