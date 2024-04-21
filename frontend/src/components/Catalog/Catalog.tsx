import { Card, Typography } from "antd";
import styles from "./Catalog.module.scss";
import { Link } from "react-router-dom";
import { useTypesControllerFindAllQuery } from "../../store/api/defaultApi";
import { IType } from "../../types/ICatalogElement";

export const Catalog = () => {
  const { data: typesData } = useTypesControllerFindAllQuery({
    page: 1,
    limit: 100,
  });

  return (
    <>
      <Typography.Title>Каталог</Typography.Title>

      <div className={styles.wrapper}>
        {typesData?.types.map((catalogElement: IType) => {
          const imageUrl = `${import.meta.env.VITE_BASE_URL}/uploads/${
            catalogElement.image.filename
          }`;

          return (
            <Link to={catalogElement.url}>
              <Card
                className={styles.card}
                hoverable
                cover={<img src={imageUrl} alt={catalogElement.name} />}
              >
                <Card.Meta title={catalogElement.name} />
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
};
