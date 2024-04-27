import { Card, Typography } from "antd";
import styles from "./Catalog.module.scss";
import { Link } from "react-router-dom";
import { IType } from "../../types/ICatalogElement";
import { ShadowCard } from "../ShadowCard/ShadowCard";
import { getImageUrl } from "../../utils/get-image-url";
import { useGetTypesQuery } from "../../store/api/types/types-api";
import { useGetPaginationBlock } from "../../hooks/use-get-pagination-block";
import {
  DEFAULT_TYPES_LIMIT_IN_CATALOG_PAGE,
  TYPES_COUNT_IN_CATALOG_PAGE,
} from "../../constants/types-constants";

export const Catalog = () => {
  const { currentPage, PaginationBlock } = useGetPaginationBlock();

  const { data: typesData } = useGetTypesQuery({
    page: currentPage,
    limit: DEFAULT_TYPES_LIMIT_IN_CATALOG_PAGE,
  });

  return (
    <>
      <Typography.Title>Каталог</Typography.Title>

      <div className={styles.wrapper}>
        {typesData?.types.map((catalogElement: IType) => {
          return (
            <Link
              className={styles.link}
              to={catalogElement.url}
              key={catalogElement.id}
            >
              <ShadowCard
                className={styles.card}
                cover={
                  <img
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

      <PaginationBlock
        totalDataCount={typesData?.totalCount}
        countElementsOnPage={TYPES_COUNT_IN_CATALOG_PAGE}
      />
    </>
  );
};
