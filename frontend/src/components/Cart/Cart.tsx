import { Button, Typography } from "antd";
import styles from "./Cart.module.scss";
import { EmptyMessage } from "../EmptyMessage/EmptyMessage";
import { ShadowCard } from "../ShadowCard/ShadowCard";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useCartActions } from "../../hooks/use-cart-actionts";
import { getImageUrl } from "../../utils/getImageUrl";

export const Cart = () => {
  const { cartProductsData } = useCartActions();

  const products = cartProductsData?.carts_products;

  return (
    <>
      <Typography.Title>Корзина</Typography.Title>

      {products?.length ? (
        <div className={styles.cartWrapper}>
          <div className={styles.cardWithProductWrapper}>
            {products.map((product) => (
              <ShadowCard className={styles.card} key={product.product.id}>
                <div className={styles.productWrapper}>
                  <div className={styles.productImageWrapper}>
                    <img
                      className={styles.productImage}
                      src={getImageUrl(product.product.image.filename)}
                      alt={product.product.name}
                    />

                    <div className={styles.productInfo}>
                      <Typography.Text className={styles.productName}>
                        {product.product.name}
                      </Typography.Text>

                      <Typography.Text className={styles.productPriceForPiece}>
                        {product.product.price} ₽ за шт.
                      </Typography.Text>
                    </div>
                  </div>

                  <div className={styles.productPriceWrapper}>
                    <div className={styles.productsCounter}>
                      <MinusOutlined className={styles.counterButtons} />
                      {product.quantity}
                      <PlusOutlined className={styles.counterButtons} />
                    </div>

                    <Typography.Text className={styles.productPrice}>
                      {product.product.price} ₽
                    </Typography.Text>
                  </div>
                </div>
              </ShadowCard>
            ))}
          </div>

          <div className={styles.resultWrapper}>
            <div className={styles.result}>
              <Typography.Text className={styles.resultName}>
                3 товара
              </Typography.Text>

              <Typography.Text className={styles.resultPrice}>
                111
              </Typography.Text>
            </div>

            <div className={styles.result}>
              <Typography.Text className={styles.resultName}>
                Итог
              </Typography.Text>

              <Typography.Text className={styles.resultPrice}>
                111
              </Typography.Text>
            </div>

            <Button type="primary" block>
              Оформить заказ
            </Button>
          </div>
        </div>
      ) : (
        <EmptyMessage description="Корзина пуста" />
      )}
    </>
  );
};
