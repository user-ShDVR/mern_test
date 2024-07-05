import { Card } from "antd";
import { Link } from "react-router-dom";

import { CartButtons } from "components/Cart/CartButtons/CartButtons";
import { ImageInCard } from "components/ImageInCard/ImageInCard";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import { IProduct } from "types/IProduct";

import styles from "./ProductCard.module.scss";

interface IProductCardProps {
  productData: IProduct;
  navigationUrl: string;
}

export const ProductCard = (props: IProductCardProps) => {
  const { productData, navigationUrl } = props;

  return (
    <Link className={styles.link} to={navigationUrl} key={productData.id}>
      <ShadowCard
        className={styles.cardWrapper}
        key={productData.id}
        cover={<ImageInCard imageUrl={productData.image.filename} />}
      >
        <Card.Meta
          title={
            <>
              <p className={styles.cardText}>{productData.price} ₽</p>
              <p className={styles.cardText}>{productData.name}</p>
            </>
          }
          description={<CartButtons productId={productData.id} />}
        />
      </ShadowCard>
    </Link>
  );
};
