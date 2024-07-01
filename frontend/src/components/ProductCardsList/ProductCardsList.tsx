import { Empty } from "antd";


import { ProductCard } from "components/ProductCardsList/ProductCard/ProductCard";

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
        <Empty description="Товары не найдены." />
      )}

      {productsData?.map((product: IProduct) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
