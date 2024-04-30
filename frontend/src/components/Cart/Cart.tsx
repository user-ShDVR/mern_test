import { ClearOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

import { EmptyMessage } from "components/EmptyMessage/EmptyMessage";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import { CartActions, useCartActions } from "hooks/general/use-cart-actions";

import { getImageUrl } from "utils/get-image-url";

import { IProductFields } from "types/IProduct";

import styles from "./Cart.module.scss";

export const Cart = () => {
  const { cartProductsData, handleChangeProductQuantity, handleClearCart } =
    useCartActions();

  const products = cartProductsData?.carts_products;

  const handlePlus = (product: IProductFields) => {
    handleChangeProductQuantity({
      productId: product.product_id,
      quantity: product.quantity,
      action: CartActions.PLUS,
    });
  };

  const handleMinus = (product: IProductFields) => {
    handleChangeProductQuantity({
      productId: product.product_id,
      quantity: product.quantity,
      action: CartActions.MINUS,
    });
  };

  const reducedProducts = products?.reduce(
    (acc: number, product: IProductFields) => {
      return acc + product.product.price * product.quantity;
    },
    0
  );

  const resultPriceCount = products ? reducedProducts : 0;

  return (
    <>
      <Typography.Title>Корзина</Typography.Title>

      {products?.length ? (
        <>
          <Button className={styles.clearButton} onClick={handleClearCart}>
            <ClearOutlined />
            Очистить корзину
          </Button>

          <div className={styles.cartWrapper}>
            <div className={styles.cardWithProductWrapper}>
              {products.map((product: IProductFields) => (
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

                        <Typography.Text
                          className={styles.productPriceForPiece}
                        >
                          {product.product.price} ₽ за шт.
                        </Typography.Text>
                      </div>
                    </div>

                    <div className={styles.productPriceWrapper}>
                      <div className={styles.productsCounter}>
                        <MinusOutlined
                          className={styles.counterButtons}
                          onClick={() => handleMinus(product)}
                        />

                        {product.quantity}

                        <PlusOutlined
                          className={styles.counterButtons}
                          onClick={() => handlePlus(product)}
                        />
                      </div>

                      <Typography.Text className={styles.productPrice}>
                        {product.product.price * product.quantity} ₽
                      </Typography.Text>
                    </div>
                  </div>
                </ShadowCard>
              ))}
            </div>

            <div className={styles.resultWrapper}>
              <div className={styles.result}>
                <Typography.Text className={styles.resultName}>
                  {products.length} товара
                </Typography.Text>

                <Typography.Text className={styles.resultPrice}>
                  {resultPriceCount} ₽
                </Typography.Text>
              </div>

              <div className={styles.result}>
                <Typography.Text className={styles.resultName}>
                  Итог
                </Typography.Text>

                <Typography.Text className={styles.resultPrice}>
                  {resultPriceCount} ₽
                </Typography.Text>
              </div>

              <Button type="primary" block>
                Оформить заказ
              </Button>
            </div>
          </div>
        </>
      ) : (
        <EmptyMessage description="Корзина пуста" />
      )}
    </>
  );
};
