import React from "react";

import { Empty, Pagination, Tabs, Typography } from "antd";

import { CatalogCard } from "components/Catalog/CatalogCard/CatalogCard";
import { ProductCard } from "components/Product/ProductCard/ProductCard";

import { RouterPath } from "configs/route-config";

import { useSetCategoryInfo } from "hooks/catalog/use-set-category-info";
import { useContexts } from "hooks/general/use-contexts";
import { useGetPaginatedData } from "hooks/general/use-get-paginated-data";

import styles from "./SearchResult.module.scss";

export const SearchResult = () => {
  const [productsCurrentPage, setProductsCurrentPage] = React.useState(1);
  const [typesCurrentPage, setTypesCurrentPage] = React.useState(1);

  const {
    searchDataContext: { searchData, searchQueryString },
  } = useContexts();

  const { paginatedData: productsSearchPaginatedData } = useGetPaginatedData({
    data: searchData?.products,
    currentPage: productsCurrentPage,
    pageSize: 4,
  });

  const { paginatedData: typesSearchPaginatedData } = useGetPaginatedData({
    data: searchData?.types,
    currentPage: typesCurrentPage,
    pageSize: 4,
  });

  const handleProductsPageChange = (page: number) => {
    setProductsCurrentPage(page);
  };

  const handleTypesPageChange = (page: number) => {
    setTypesCurrentPage(page);
  };

  const { handleSetCategoryInfo } = useSetCategoryInfo();

  const tabsItems = [
    {
      key: "1",
      label: "Товары",
      children: (
        <div className={styles.searchResultWrapper}>
          <div className={styles.searchResultProductsWrapper}>
            {productsSearchPaginatedData?.map((product) => (
              <ProductCard
                productData={product}
                navigationUrl={`${RouterPath.main}${product.id}`}
              />
            ))}
          </div>

          {!!searchData?.products?.length && (
            <Pagination
              className={styles.searchResultPaginationWrapper}
              current={productsCurrentPage}
              pageSize={4}
              total={searchData?.products?.length}
              onChange={handleProductsPageChange}
            />
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Категории",
      children: (
        <div className={styles.searchResultWrapper}>
          <div className={styles.catalogCardsWrapper}>
            {typesSearchPaginatedData?.map((catalogElement) => (
              <CatalogCard
                catalogElement={catalogElement}
                handleSetCategoryInfo={handleSetCategoryInfo}
                navigationUrl={`${RouterPath.catalog}/${catalogElement.url}`}
              />
            ))}
          </div>

          {!!searchData?.types?.length && (
            <Pagination
              className={styles.searchResultPaginationWrapper}
              current={typesCurrentPage}
              pageSize={4}
              total={searchData?.types?.length}
              onChange={handleTypesPageChange}
            />
          )}

          {searchData?.types?.length === 0 && (
            <Empty description="Категории не найдены." />
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Typography.Title>
        Результаты поиска по запросу {searchQueryString}
      </Typography.Title>

      <Tabs defaultActiveKey="1" items={tabsItems} />
    </>
  );
};
