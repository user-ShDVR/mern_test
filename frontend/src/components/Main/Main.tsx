import React from "react";

import { Button, Pagination, Spin, Typography } from "antd";

import { AdaptiveDrawer } from "components/AdaptiveDrawer/AdaptiveDrawer";
import { ProductCardsList } from "components/ProductCardsList/ProductCardsList";

import { useGetProductsQuery } from "store/api/products/products-api";

import { useGetProductsFilters } from "hooks/products/use-get-products-filters";

import styles from "./Main.module.scss";
import { MainEventsBlock } from "./MainEventsBlock/MainEventsBlock";

export const Main = () => {
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const { FiltersAside, minValue, maxValue, sortOrder, sortBy } =
    useGetProductsFilters();

  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery({
      page: currentPage,
      limit: 3,
      minPrice: minValue,
      maxPrice: maxValue,
      type: "",
      sortBy,
      sortOrder,
    });

  const isEmptyProductsData = productsData?.products.length === 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <MainEventsBlock />

      <Typography.Title className={styles.mainTitle}>
        Наши товары
      </Typography.Title>

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

      {isProductsLoading ? (
        <Spin size="large" />
      ) : (
        <div className={styles.mainWrapper}>
          <div className={styles.filtersWrapper}>{FiltersAside}</div>
          <ProductCardsList productsData={productsData?.products} />
        </div>
      )}

      {!isEmptyProductsData && (
        <Pagination
          className={styles.paginationWrapper}
          pageSize={3}
          total={productsData?.totalCount}
          onChange={handlePageChange}
          current={currentPage}
        />
      )}
    </>
  );
};
