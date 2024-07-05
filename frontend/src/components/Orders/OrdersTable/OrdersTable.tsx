import React from "react";

import { Table, Typography } from "antd";

import {
  EMPTY_ORDERS_TABLE_TEXT,
  ordersTableDataIndexes,
  ordersTableTitles,
} from "constants/orders-constants";

import { addKeysToObjectInArray } from "utils/add-keys-to-object-in-array";
import { formattedDate } from "utils/formatted-date";
import { getImageUrl } from "utils/get-image-url";

import { IOrder } from "types/IOrder";

import styles from "./OrdersTable.module.scss";

interface IOrdersTableProps {
  ordersData: IOrder[];
}

export const OrdersTable = (props: IOrdersTableProps) => {
  const { ordersData } = props;

  const tableData = React.useMemo(
    () =>
      ordersData?.length ?? 0 > 0
        ? addKeysToObjectInArray<IOrder>({ array: [...ordersData] })
        : [],
    [ordersData]
  );

  const columns = [
    {
      title: ordersTableTitles.id,
      dataIndex: ordersTableDataIndexes.id,
      key: ordersTableDataIndexes.id,
    },
    {
      title: ordersTableTitles.address,
      dataIndex: ordersTableDataIndexes.address,
      key: ordersTableDataIndexes.address,
    },
    {
      title: ordersTableTitles.quantity,
      dataIndex: ordersTableDataIndexes.quantity,
      key: ordersTableDataIndexes.quantity,
    },
    {
      title: ordersTableTitles.created,
      dataIndex: ordersTableDataIndexes.created,
      key: ordersTableDataIndexes.created,
      render: (created: string) => formattedDate(created),
    },
    {
      title: ordersTableTitles.status,
      dataIndex: ordersTableDataIndexes.status,
      key: ordersTableDataIndexes.status,
    },
    {
      title: ordersTableTitles.summary,
      dataIndex: ordersTableDataIndexes.summary,
      key: ordersTableDataIndexes.summary,
    },
  ];

  return (
    <Table
      className={styles.ordersTableWrapper}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      locale={{ emptyText: EMPTY_ORDERS_TABLE_TEXT }}
      expandable={{
        expandedRowRender: (record) => (
          <>
            <Typography.Text>
              {ordersTableTitles.order_products}
            </Typography.Text>

            <div className={styles.orderProductsWrapper}>
              {record.order_products?.map((product) => (
                <div
                  className={styles.orderProductWrapper}
                  key={product.product.id}
                >
                  <img
                    className={styles.orderProductImage}
                    src={getImageUrl(product.product.image.filename)}
                    alt=""
                  />

                  <div className={styles.orderProductTextInfo}>
                    <Typography.Text strong>
                      {product.product.name}
                    </Typography.Text>

                    <Typography.Text>
                      Цена за единицу: <b>{product.product.price}</b> ₽.
                    </Typography.Text>

                    <Typography.Text>
                      В количестве <b>{product.quantity}</b>
                    </Typography.Text>
                  </div>
                </div>
              ))}
            </div>
          </>
        ),
      }}
    />
  );
};
