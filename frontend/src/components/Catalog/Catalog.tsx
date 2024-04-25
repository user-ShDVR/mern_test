import { Card, Typography } from "antd";
import styles from "./Catalog.module.scss";
import { Link } from "react-router-dom";
import { IType } from "../../types/ICatalogElement";
import { ShadowCard } from "../ShadowCard/ShadowCard";
import { getImageUrl } from "../../utils/getImageUrl";
import { useGetTypesQuery } from "../../store/api/types/types-api";

export const Catalog = () => {
  const { data: typesData } = useGetTypesQuery({
    page: 1,
    limit: 100,
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
    </>
  );
};
