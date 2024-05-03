import { ClearOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

import { EmptyMessage } from "components/EmptyMessage/EmptyMessage";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import { useAddOrderMutation } from "store/api/orders/orders-api";

import { ECartActions, useCartActions } from "hooks/general/use-cart-actions";
import { useGetUser } from "hooks/user/use-get-user";

import { getDeclination } from "utils/get-declination";
import { getImageUrl } from "utils/get-image-url";

import { IProductChangeQuantity } from "types/IProduct";

import styles from "./Cart.module.scss";

export const Cart = () => {
  const { cartProductsData, handleChangeProductQuantity, handleClearCart } =
    useCartActions();

  console.log(cartProductsData);

  const products = cartProductsData?.carts_products;
  const productsCount = products?.length;

  const { userData } = useGetUser();

  const [addOrder] = useAddOrderMutation();

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

  const resultPriceCount = products ? reducedProducts : 0;

  const handleAddOrder = () => {
    const orderProducts = products?.map((product) => ({
      productId: product.product_id,
      quantity: product.quantity,
    }));

    const data = {
      user_id: userData?.id,
      quantity: productsCount,
      summary: resultPriceCount,
      products: orderProducts,
    };

    addOrder(data).then((response) => {
      console.log(response);
      // if (response.error.originalStatus) {
      //   message.success(response.error.data);
      // } else {
      //   message.error("Произошла ошибка при добавлении заказа");
      // }
    });
  };

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

              <Button type="primary" onClick={handleAddOrder} block>
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
