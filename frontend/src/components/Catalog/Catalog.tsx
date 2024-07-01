import { Card, Empty, Pagination, Typography } from "antd";
import { Link } from "react-router-dom";

import { ImageInCard } from "components/ImageInCard/ImageInCard";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import { useGetTypesQuery } from "store/api/types/types-api";

import { DEFAULT_PAGE_SIZE } from "constants/general-constants";

import { useContexts } from "hooks/general/use-contexts";

import { IType } from "types/IType";

import styles from "./Catalog.module.scss";

export const Catalog = () => {
  const {
    currentPageContext: { currentPage, setCurrentPage },
    catalogCategoryContext: {
      setCatalogCategoryTypeName,
      setCatalogCategoryTypeUrl,
    },
  } = useContexts();

  const { data: typesData } = useGetTypesQuery({
    page: currentPage,
    limit: DEFAULT_PAGE_SIZE,
  });

  const handleSetCategoryInfo = (catalogElement: IType) => {
    setCatalogCategoryTypeName(catalogElement.name);
    setCatalogCategoryTypeUrl(catalogElement.url);
  };

  const isEmptyTypesData = typesData?.types?.length === 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Typography.Title>Каталог</Typography.Title>

      <div className={styles.catalogWrapper}>
        {typesData?.types.map((catalogElement: IType) => {
          return (
            <Link
              className={styles.catalogLink}
              to={catalogElement.url}
              key={catalogElement.id}
              onClick={() => handleSetCategoryInfo(catalogElement)}
            >
              <ShadowCard
                className={styles.catalogCard}
                cover={<ImageInCard imageUrl={catalogElement.image.filename} />}
              >
                <Card.Meta title={catalogElement.name} />
              </ShadowCard>
            </Link>
          );
        })}
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
