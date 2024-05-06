import { Typography } from "antd";

import { ProductCardsList } from "components/ProductCardsList/ProductCardsList";
import { Spinner } from "components/Spinner/Spinner";

import { useGetProductsQuery } from "store/api/products/products-api";

import { PRODUCTS_COUNT_IN_MAIN_PAGE } from "constants/products-constants";

import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";
import { useGetProductsFilters } from "hooks/products/use-get-products-filters";

import styles from "./Main.module.scss";

export const Main = () => {
  const { currentPage, PaginationBlock } = useGetPaginationBlock();

  const { FiltersAside, minValue, maxValue, sortOrder, sortBy } =
    useGetProductsFilters();

  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery({
      page: currentPage,
      limit: PRODUCTS_COUNT_IN_MAIN_PAGE,
      minPrice: minValue,
      maxPrice: maxValue,
      type: "",
      sortBy,
      sortOrder,
    });

  return (
    <>
      <Typography.Title>Наши товары</Typography.Title>

      {isProductsLoading ? (
        <Spinner />
      ) : (
        <div className={styles.wrapper}>
          {FiltersAside}
          <ProductCardsList productsData={productsData?.products} />
        </div>
      )}

      <PaginationBlock
        countElementsOnPage={PRODUCTS_COUNT_IN_MAIN_PAGE}
        totalCount={productsData?.totalCount}
      />
    </>
  );
};
