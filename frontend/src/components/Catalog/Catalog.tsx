import React from "react";

import { Empty, Pagination, Typography } from "antd";

import { useGetTypesQuery } from "store/api/types/types-api";

import { DEFAULT_PAGE_SIZE } from "constants/general-constants";

import { useSetCategoryInfo } from "hooks/catalog/use-set-category-info";

import { IType } from "types/IType";

import styles from "./Catalog.module.scss";
import { CatalogCard } from "./CatalogCard/CatalogCard";

export const Catalog = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data: typesData } = useGetTypesQuery({
    page: currentPage,
    limit: DEFAULT_PAGE_SIZE,
  });

  const { handleSetCategoryInfo } = useSetCategoryInfo();
  const isEmptyTypesData = typesData?.types?.length === 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Typography.Title>Каталог</Typography.Title>

      <div className={styles.catalogWrapper}>
        {typesData?.types.map((catalogElement: IType) => (
          <CatalogCard
            catalogElement={catalogElement}
            handleSetCategoryInfo={handleSetCategoryInfo}
            navigationUrl={catalogElement.url}
          />
        ))}
      </div>

      {isEmptyTypesData && <Empty description="Категории не найдены." />}

      {!isEmptyTypesData && (
        <Pagination
          className={styles.catalogPaginationWrapper}
          pageSize={DEFAULT_PAGE_SIZE}
          total={typesData?.totalCount}
          onChange={handlePageChange}
          current={currentPage}
        />
      )}
    </>
  );
};
