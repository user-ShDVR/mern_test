import React from "react";

import { ClearOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

import { EmptyMessage } from "components/EmptyMessage/EmptyMessage";
import { ImageInCard } from "components/ImageInCard/ImageInCard";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import { ECartActions, useCartActions } from "hooks/cart/use-cart-actions";

import { getDeclination } from "utils/get-declination";

import { IProductChangeQuantity } from "types/IProduct";

import { ArrangeOrderModal } from "./ArrangeOrderModal";
import styles from "./Cart.module.scss";

export const Cart = () => {
  const [isOpenArrangeOrderModal, setIsOpenArrangeOrderModal] =
    React.useState(false);

  const { cartProductsData, handleChangeProductQuantity, handleClearCart } =
    useCartActions();

  const products = cartProductsData?.carts_products;
  const productsCount = products?.length;

  const handlePlus = (product: IProductChangeQuantity) => {
    handleChangeProductQuantity({
      productId: product.product_id,
      quantity: product.quantity,
      action: ECartActions.PLUS,
    });
  };

  const handleMinus = (product: IProductChangeQuantity) => {
    handleChangeProductQuantity({
      productId: product.product_id,
      quantity: product.quantity,
      action: ECartActions.MINUS,
    });
  };

  const reducedProducts = products?.reduce((acc: number, product) => {
    return acc + product.product.price * product.quantity;
  }, 0);

  const handleOpenArrangeOrderModal = () => {
    setIsOpenArrangeOrderModal(true);
  };

  const handleCloseArrangeOrderModal = () => {
    setIsOpenArrangeOrderModal(false);
  };

  const resultPriceCount = products ? reducedProducts : 0;

  const declinationProducts = getDeclination({
    one: "товар",
    few: "товара",
    many: "товаров",
    value: productsCount,
  });

  return (
    <>
      <Typography.Title>Корзина</Typography.Title>

      {productsCount ? (
        <>
          <Button className={styles.clearButton} onClick={handleClearCart}>
            <ClearOutlined />
            Очистить корзину
          </Button>

          <div className={styles.cartWrapper}>
            <div className={styles.cardWithProductWrapper}>
              {products.map((product) => (
                <ShadowCard className={styles.card} key={product.product.id}>
                  <div className={styles.productWrapper}>
                    <div className={styles.productImageWrapper}>
                      <ImageInCard
                        className={styles.productImage}
                        imageUrl={product.product.image.filename}
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
                  {declinationProducts} на
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

              <Button
                type="primary"
                onClick={handleOpenArrangeOrderModal}
                block
              >
                Оформить заказ
              </Button>
            </div>
          </div>
        </>
      ) : (
        <EmptyMessage description="Корзина пуста" />
      )}

      <ArrangeOrderModal
        isOpenArrangeOrderModal={isOpenArrangeOrderModal}
        onCloseArrangeOrderModal={handleCloseArrangeOrderModal}
        products={products}
        productsCount={productsCount}
        resultPriceCount={resultPriceCount}
      />
    </>
  );
};
