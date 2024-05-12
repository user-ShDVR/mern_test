import React from "react";

import { Button, Tag, Typography, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import {
  useDeleteOrdersMutation,
  useGetOrdersForAdminQuery,
} from "store/api/orders/orders-api";

import {
  DEFAULT_ORDER_LIMIT_IN_ORDERS_PAGE,
  ORDERS_COUNT_IN_ADMIN_PANEL_PAGE,
  adminOrderStatuses,
} from "constants/order-constants";

import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";

import { getDeclination } from "utils/get-declination";

import { IOrder } from "types/IOrder";

import { EditOrderModal } from "./EditOrderModal";

export const AdminOrdersTab = () => {
  const [certainOrderInModal, setCertainOrderInModal] = React.useState(
    {} as IOrder
  );

  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);

  const { currentPage, PaginationBlock } = useGetPaginationBlock();

  const { data: ordersData } = useGetOrdersForAdminQuery({
    page: currentPage,
    limit: DEFAULT_ORDER_LIMIT_IN_ORDERS_PAGE,
  });

  const [
    deleteOrder,
    {
      isSuccess: isDeleteOrderSuccess,
      isError: isDeleteOrderError,
      isLoading: isDeleteOrderLoading,
    },
  ] = useDeleteOrdersMutation();

  const isEmptyOrdersData = ordersData?.orders?.length === 0;

  const declinationOrders = getDeclination({
    one: "заказ",
    few: "заказа",
    many: "заказов",
    value: ordersData?.totalCount,
  });

  const handleOpenEditModal = (order: IOrder) => {
    setIsOpenEditModal(true);
    setCertainOrderInModal(order);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const handleDeleteOrder = async (product: IOrder) => {
    await deleteOrder({ id: product.id });
  };

  React.useEffect(() => {
    if (!isDeleteOrderLoading && isDeleteOrderSuccess) {
      message.success("Заказ успешно удален");
    } else if (!isDeleteOrderLoading && isDeleteOrderError) {
      message.error("Произошла ошибка при удалении заказа");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteOrderSuccess, isDeleteOrderError]);

  return (
    <>
      <Typography.Text className={styles.countTitle}>
        В системе - <b>{declinationOrders}</b>
      </Typography.Text>

      <div className={styles.entityWrapperCards}>
        {ordersData?.orders.map((order: IOrder) => (
          <ShadowCard key={order.id}>
            <Button
              className={styles.entityCardEditButton}
              type="primary"
              onClick={() => handleOpenEditModal(order)}
            >
              Редактировать
            </Button>

            <Button
              className={styles.entityCardDeleteButton}
              onClick={() => handleDeleteOrder(order)}
            >
              Удалить
            </Button>

            <p>
              Идентификатор: <Tag>{order.id}</Tag>
            </p>

            <p className={styles.ordersStatus}>
              Статус заказа:{" "}
              <Tag
                color={
                  order.status === adminOrderStatuses.paymentExpect
                    ? "warning"
                    : "success"
                }
              >
                {order.status}
              </Tag>
            </p>
          </ShadowCard>
        ))}
      </div>

      {!isEmptyOrdersData && (
        <PaginationBlock
          countElementsOnPage={ORDERS_COUNT_IN_ADMIN_PANEL_PAGE}
          totalCount={ordersData?.totalCount}
        />
      )}

      <EditOrderModal
        isOpenEditModal={isOpenEditModal}
        onCloseEditModal={handleCloseEditModal}
        certainOrderInModal={certainOrderInModal}
      />
    </>
  );
};
