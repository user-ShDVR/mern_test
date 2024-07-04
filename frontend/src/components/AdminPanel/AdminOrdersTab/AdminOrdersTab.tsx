import React from "react";

import { Pagination, Typography } from "antd";

import { useGetOrdersForAdminQuery } from "store/api/orders/orders-api";

import { getDeclination } from "utils/get-declination";

import { IOrder } from "types/IOrder";

import styles from "./AdminOrdersTab.module.scss";
import { EditOrderModal } from "./EditOrderModal/EditOrderModal";
import { OrdersTabTable } from "./OrdersTabTable/OrdersTabTable";

export const AdminOrdersTab = () => {
  const [orderDataInModal, setOrderDataInModal] = React.useState({} as IOrder);
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data: ordersData } = useGetOrdersForAdminQuery({
    page: currentPage,
    limit: 5,
  });

  const isEmptyOrdersData = ordersData?.orders?.length === 0;

  const declinationOrders = getDeclination({
    one: "заказ",
    few: "заказа",
    many: "заказов",
    value: ordersData?.totalCount,
  });

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Typography.Text className={styles.adminOrdersTabTitle}>
        В системе - <b>{declinationOrders}</b>
      </Typography.Text>

      <OrdersTabTable
        ordersData={ordersData?.orders ?? []}
        setIsOpenEditModal={setIsOpenEditModal}
        setOrderDataInModal={setOrderDataInModal}
      />

      {!isEmptyOrdersData && (
        <Pagination
          className={styles.adminOrdersTabPaginationWrapper}
          pageSize={5}
          total={ordersData?.totalCount}
          onChange={handlePageChange}
          current={currentPage}
        />
      )}

      <EditOrderModal
        isOpenEditModal={isOpenEditModal}
        onCloseEditModal={handleCloseEditModal}
        orderDataInModal={orderDataInModal}
      />
    </>
  );
};
