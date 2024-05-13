import { Card, Typography } from "antd";
import { Link } from "react-router-dom";

import { EmptyMessage } from "components/EmptyMessage/EmptyMessage";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import { useGetTypesQuery } from "store/api/types/types-api";

import {
  DEFAULT_TYPES_LIMIT_IN_CATALOG_PAGE,
  TYPES_COUNT_IN_CATALOG_PAGE,
} from "constants/types-constants";

import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";

import { getImageUrl } from "utils/get-image-url";

import { IType } from "types/IType";

import styles from "./Catalog.module.scss";

export const Catalog = () => {
  const { currentPage, PaginationBlock } = useGetPaginationBlock();

  const { data: typesData } = useGetTypesQuery({
    page: currentPage,
    limit: DEFAULT_TYPES_LIMIT_IN_CATALOG_PAGE,
  });

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
              state={{
                categoryTypeName: catalogElement.name,
                categoryTypeUrl: catalogElement.url,
              }}
            >
              <ShadowCard
                className={styles.catalogCard}
                cover={
                  <img
                    className={styles.catalogImage}
                    src={getImageUrl(catalogElement.image.filename)}
                    alt={catalogElement.name}
                  />
                }
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
