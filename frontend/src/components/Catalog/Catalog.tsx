import { Card, Typography } from "antd";
import { Link } from "react-router-dom";

import { EmptyMessage } from "components/EmptyMessage/EmptyMessage";
import { ImageInCard } from "components/ImageInCard/ImageInCard";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import { useGetTypesQuery } from "store/api/types/types-api";

import {
  DEFAULT_TYPES_LIMIT_IN_CATALOG_PAGE,
  TYPES_COUNT_IN_CATALOG_PAGE,
} from "constants/types-constants";

import { useActions } from "hooks/general/use-actions";
import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";

import { IType } from "types/IType";

import styles from "./Catalog.module.scss";

export const Catalog = () => {
  const { setCategoryTypeName, setCategoryTypeUrl } = useActions();
  const { currentPage, PaginationBlock } = useGetPaginationBlock();

  const { data: typesData } = useGetTypesQuery({
    page: currentPage,
    limit: DEFAULT_TYPES_LIMIT_IN_CATALOG_PAGE,
  });

  const handleSetCategoryInfo = (catalogElement: IType) => {
    setCategoryTypeName(catalogElement.name);
    setCategoryTypeUrl(catalogElement.url);
  };

  const isEmptyTypesData = typesData?.types?.length === 0;

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

      {isEmptyTypesData && <EmptyMessage description="Категории не найдены" />}

      {!isEmptyTypesData && (
        <PaginationBlock
          totalCount={typesData?.totalCount}
          countElementsOnPage={TYPES_COUNT_IN_CATALOG_PAGE}
        />
      )}
    </>
  );
};
