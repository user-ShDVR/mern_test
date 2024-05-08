import { Card, Tag, Typography } from "antd";

import { EmptyMessage } from "components/EmptyMessage/EmptyMessage";
import { ShadowCard } from "components/ShadowCard/ShadowCard";
import { Spinner } from "components/Spinner/Spinner";

import { useGetOrdersQuery } from "store/api/orders/orders-api";

import {
  DEFAULT_ORDER_LIMIT_IN_ORDERS_PAGE,
  adminOrderStatuses,
} from "constants/order-constants";

import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";
import { useGetUser } from "hooks/user/use-get-user";

import { formattedDate } from "utils/formatted-date";
import { getImageUrl } from "utils/get-image-url";

import styles from "./Orders.module.scss";

export const Orders = () => {
  const { currentPage, PaginationBlock } = useGetPaginationBlock();

  const { userData } = useGetUser();

  const { data: ordersData, isLoading: isOrdersDataLoading } =
    useGetOrdersQuery({
      id: userData?.id,
      page: currentPage,
      limit: DEFAULT_ORDER_LIMIT_IN_ORDERS_PAGE,
    });

  const isEmptyOrdersData = ordersData?.orders?.length === 0;

  return (
    <>
      <Typography.Title>Заказы</Typography.Title>

      {isOrdersDataLoading ? (
        <Spinner />
      ) : (
        <div className={styles.orderWrapper}>
          {ordersData?.orders?.map((order) => (
            <div>
              <Typography.Text>
                Заказ оформлен: <b>{formattedDate(order.created)}</b>
              </Typography.Text>

              <div className={styles.orderDigitsInfoWrapper}>
                <Typography.Text>
                  Идентификатор заказа: <b>{order.id}</b>
                </Typography.Text>
                —
                <Typography.Text>
                  Количество товара: <b>{order.quantity}</b>
                </Typography.Text>
                —
                <Typography.Text>
                  Сумма заказа: <b>{order.summary} ₽</b>
                </Typography.Text>
              </div>

              <div className={styles.orderStatusWrapper}>
                <Typography.Text>Статус:</Typography.Text>
                <Tag
                  bordered={false}
                  color={
                    order.status === adminOrderStatuses.paymentExpect
                      ? "warning"
                      : "success"
                  }
                >
                  {order.status}
                </Tag>
              </div>

              <Typography.Text className={styles.orderTitle}>
                <b>Список заказанных товаров:</b>
              </Typography.Text>

              <div className={styles.orderProductsScrollLine}>
                <div className={styles.orderProductsListWrapper} key={order.id}>
                  {order.order_products?.map((product) => (
                    <ShadowCard
                      className={styles.orderProductWrapper}
                      key={product.product.id}
                      cover={
                        <img
                          className={styles.orderProductImage}
                          src={getImageUrl(product.product.image.filename)}
                          alt=""
                        />
                      }
                    >
                      <Card.Meta
                        title={`${product.product.price} ₽ (В количестве ${product.quantity})`}
                      />

                      <Typography.Text className={styles.orderProductName}>
                        {product.product.name}
                      </Typography.Text>

                      <Typography.Text
                        className={styles.orderProductDescription}
                      >
                        {product.product.description}
                      </Typography.Text>
                    </ShadowCard>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isEmptyOrdersData && <EmptyMessage description="Заказы не найдены" />}

      {!isEmptyOrdersData && (
        <PaginationBlock
          countElementsOnPage={DEFAULT_ORDER_LIMIT_IN_ORDERS_PAGE}
          totalCount={ordersData?.totalCount}
          marginTop="5vh"
        />
      )}
    </>
  );
};
