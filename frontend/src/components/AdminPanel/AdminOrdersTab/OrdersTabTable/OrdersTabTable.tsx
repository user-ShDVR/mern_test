import React from "react";

import { Popconfirm, Table, Typography } from "antd";

import { useDeleteOrdersMutation } from "store/api/orders/orders-api";

import { EMPTY_ADMIN_TAB_TABLE_TEXT } from "constants/general-constants";
import {
  ordersAdminTableDataIndexes,
  ordersAdminTableTitles,
} from "constants/orders-constants";

import { useGetQueryMessages } from "hooks/general/use-get-query-messages";

import { addKeysToObjectInArray } from "utils/add-keys-to-object-in-array";

import { IOrder } from "types/IOrder";

import styles from "./OrdersTabTable.module.scss";

interface IOrdersTabTableProps {
  ordersData: IOrder[];
  setIsOpenEditModal: (value: boolean) => void;
  setOrderDataInModal: (value: IOrder) => void;
}

export const OrdersTabTable = (props: IOrdersTabTableProps) => {
  const { ordersData, setIsOpenEditModal, setOrderDataInModal } = props;

  const tableData = React.useMemo(
    () =>
      ordersData?.length ?? 0 > 0
        ? addKeysToObjectInArray<IOrder>({ array: [...ordersData] })
        : [],
    [ordersData]
  );

  const [
    deleteOrder,
    {
      isLoading: isDeleteOrderLoading,
      isSuccess: isDeleteOrderSuccess,
      status: deleteOrderStatus,
      error: deleteOrderError,
    },
  ] = useDeleteOrdersMutation();

  const handleDeleteOrder = async (product: IOrder) => {
    await deleteOrder({ id: product.id });
  };

  const handleOpenEditModal = (order: IOrder) => {
    setIsOpenEditModal(true);
    setOrderDataInModal(order);
  };

  useGetQueryMessages({
    isLoading: isDeleteOrderLoading,
    isSuccess: isDeleteOrderSuccess,
    status: deleteOrderStatus,
    error: deleteOrderError,
    successMessage: "Заказ успешно удален.",
    errorMessage: "Произошла ошибка при удалении заказа.",
  });

  const columns = [
    {
      title: ordersAdminTableTitles.id,
      dataIndex: ordersAdminTableDataIndexes.id,
      key: ordersAdminTableDataIndexes.id,
    },
    {
      title: ordersAdminTableTitles.status,
      dataIndex: ordersAdminTableDataIndexes.status,
      key: ordersAdminTableDataIndexes.status,
    },
    {
      title: ordersAdminTableTitles.actions,
      key: ordersAdminTableDataIndexes.actionsKey,
      render: (record: IOrder) => (
        <>
          <Typography.Link onClick={() => handleOpenEditModal(record)}>
            Редактировать
          </Typography.Link>

          <Typography.Text className={styles.ordersTabTableActionsDivider}>
            |
          </Typography.Text>

          <Popconfirm
            title="Вы действительно хотите удалить этот заказ?"
            onConfirm={() => handleDeleteOrder(record)}
            okText="Да"
            cancelText="Нет"
          >
            <Typography.Link>Удалить</Typography.Link>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table
      className={styles.ordersTabTableWrapper}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      bordered
      locale={{ emptyText: EMPTY_ADMIN_TAB_TABLE_TEXT }}
    />
  );
};
