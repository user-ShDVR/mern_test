import { Typography } from "antd";
import { useLocation } from "react-router-dom";

import { ProductCardsList } from "components/ProductCardsList/ProductCardsList";

import { useGetProductsQuery } from "store/api/products/products-api";

import { PRODUCTS_COUNT_IN_CATALOG_ITEM_PAGE } from "constants/products-constants";

import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";
import { useGetProductsFilters } from "hooks/products/use-get-products-filters";

import styles from "./CatalogItem.module.scss";

export const CatalogItem = () => {
  const { currentPage, PaginationBlock } = useGetPaginationBlock();

  const { FiltersAside, minValue, maxValue, sortOrder, sortBy } =
    useGetProductsFilters();

  const location = useLocation();

  const { data: productsData } = useGetProductsQuery({
    page: currentPage,
    limit: PRODUCTS_COUNT_IN_CATALOG_ITEM_PAGE,
    minPrice: minValue,
    maxPrice: maxValue,
    type: location.state?.categoryTypeUrl,
    sortBy,
    sortOrder,
  });

  return (
    <>
      <Typography.Title>{location.state?.categoryTypeName}</Typography.Title>

      <div className={styles.wrapper}>
        {FiltersAside}
        <ProductCardsList productsData={productsData?.products} />
      </div>

      <PaginationBlock
        countElementsOnPage={PRODUCTS_COUNT_IN_CATALOG_ITEM_PAGE}
        totalCount={productsData?.totalCount}
      />
    </>
  );
};
