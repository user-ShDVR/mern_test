import React from "react";

import { Pagination, Spin, Typography } from "antd";

import { useGetOrdersQuery } from "store/api/orders/orders-api";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./Orders.module.scss";
import { OrdersTable } from "./OrdersTable/OrdersTable";

export const Orders = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { authUserData } = useGetAuthUser();

  const { data: ordersData, isLoading: isOrdersDataLoading } =
    useGetOrdersQuery({
      id: authUserData?.id,
      page: currentPage,
      limit: 7,
    });

  const isEmptyOrdersData = ordersData?.orders?.length === 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Typography.Title>Заказы</Typography.Title>

      {isOrdersDataLoading ? (
        <Spin size="large" />
      ) : (
        <OrdersTable ordersData={ordersData?.orders ?? []} />
      )}

      {!isEmptyOrdersData && (
        <Pagination
          className={styles.ordersPaginationWrapper}
          pageSize={7}
          total={ordersData?.totalCount}
          onChange={handlePageChange}
          current={currentPage}
        />
      )}
    </>
  );
};
