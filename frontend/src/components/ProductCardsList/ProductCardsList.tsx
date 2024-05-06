import { EmptyMessage } from "components/EmptyMessage/EmptyMessage";
import { ProductCard } from "components/ProductCard/ProductCard";

import { IProduct } from "types/IProduct";

import styles from "./ProductCardsList.module.scss";

interface IProductCardsListProps {
  productsData?: IProduct[];
}

export const ProductCardsList = (props: IProductCardsListProps) => {
  const { productsData } = props;

  return (
    <div className={styles.productsWrapper}>
      {productsData?.length === 0 && (
        <EmptyMessage description="Товары не найдены" />
      )}

      {productsData?.map((product: IProduct) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
