import { Button, Typography } from "antd";
import styles from "./Cart.module.scss";
import { EmptyMessage } from "../EmptyMessage/EmptyMessage";
import { ShadowCard } from "../ShadowCard/ShadowCard";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

export const Cart = () => {
  const cartData = [
    {
      id: 1,
      name: "Product 1",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkVF5kzGBgFHQtkB2-I39GqPzeuPLy7c133g&usqp=CAU",
      price: 100,
    },
  ];

  const isCartData = true;

  return (
    <>
      <Typography.Title>Корзина</Typography.Title>

      <div className={styles.cartWrapper}>
        {isCartData ? (
          cartData.map((product) => (
            <>
              <ShadowCard className={styles.cardWrapper} key={product.id}>
                <div className={styles.productWrapper}>
                  <div className={styles.productImageWrapper}>
                    <img
                      className={styles.productImage}
                      src={product.image}
                      alt={product.name}
                    />

                    <div className={styles.productInfo}>
                      <Typography.Text className={styles.productName}>
                        {product.name}
                      </Typography.Text>

                      <Typography.Text className={styles.productPriceForPiece}>
                        {product.price} ₽ за шт.
                      </Typography.Text>
                    </div>
                  </div>

                  <div className={styles.productPriceWrapper}>
                    <div className={styles.productsCounter}>
                      <MinusOutlined className={styles.counterButtons} />
                      0
                      <PlusOutlined className={styles.counterButtons} />
                    </div>

                    <Typography.Text className={styles.productPrice}>
                      {product.price} ₽
                    </Typography.Text>
                  </div>
                </div>
              </ShadowCard>

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
            </>
          ))
        ) : (
          <EmptyMessage description="Корзина пуста" />
        )}
      </div>
    </>
  );
};
