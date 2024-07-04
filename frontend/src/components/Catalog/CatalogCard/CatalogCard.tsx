import { Card } from "antd";
import { Link } from "react-router-dom";

import { ImageInCard } from "components/ImageInCard/ImageInCard";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import { IType } from "types/IType";

import styles from "./CatalogCard.module.scss";

interface ICatalogCardProps {
  catalogElement: IType;
  handleSetCategoryInfo: (catalogElement: IType) => void;
  navigationUrl: string;
}

export const CatalogCard = (props: ICatalogCardProps) => {
  const { catalogElement, handleSetCategoryInfo, navigationUrl } = props;

  return (
    <Link
      className={styles.catalogCardLink}
      to={navigationUrl}
      key={catalogElement.id}
      onClick={() => handleSetCategoryInfo(catalogElement)}
    >
      <ShadowCard
        className={styles.catalogCardWrapper}
        cover={<ImageInCard imageUrl={catalogElement.image.filename} />}
      >
        <Card.Meta title={catalogElement.name} />
      </ShadowCard>
    </Link>
  );
};
