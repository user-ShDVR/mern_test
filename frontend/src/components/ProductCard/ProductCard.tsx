import { Card } from "antd";
import { Link } from "react-router-dom";

import { CartButtons } from "components/CartButtons/CartButtons";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import { getImageUrl } from "utils/get-image-url";

import { IProduct } from "types/IProduct";

import styles from "./ProductCard.module.scss";

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard = (props: IProductCardProps) => {
  const { product } = props;

  return (
    <Link className={styles.link} to={`${product.id}`} key={product.id}>
      <ShadowCard
        className={styles.cardWrapper}
        key={product.id}
        cover={
          <img src={getImageUrl(product.image.filename)} alt={product.name} />
        }
      >
        <Card.Meta
          title={
            <>
              <p className={styles.cardText}>{product.price} ₽</p>
              <p className={styles.cardText}>{product.name}</p>
            </>
          }
          description={<CartButtons productId={product.id} />}
        />
      </ShadowCard>
    </Link>
  );
};
