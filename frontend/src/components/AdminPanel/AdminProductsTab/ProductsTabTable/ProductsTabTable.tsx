import React from "react";

import { Popconfirm, Table, Typography } from "antd";

import { useDeleteProductsMutation } from "store/api/products/products-api";

import { EMPTY_ADMIN_TAB_TABLE_TEXT } from "constants/general-constants";
import {
  adminProductCharacteristicsListColumns,
  EMPTY_CHARACTERISTICS_TEXT,
  productsAdminTableDataIndexes,
  productsAdminTableTitles,
} from "constants/products-constants";

import { useGetQueryMessages } from "hooks/general/use-get-query-messages";

import { addKeysToObjectInArray } from "utils/add-keys-to-object-in-array";
import { getImageUrl } from "utils/get-image-url";

import { IImage } from "types/IImage";
import { IProduct } from "types/IProduct";
import { IType } from "types/IType";

import styles from "./ProductsTabTable.module.scss";

interface IProductsTabTableProps {
  productsData: IProduct[];
  setIsOpenEditModal: (value: boolean) => void;
  setProductDataInModal: (value: IProduct) => void;
}

export const ProductsTabTable = (props: IProductsTabTableProps) => {
  const { productsData, setIsOpenEditModal, setProductDataInModal } = props;

  const tableData = React.useMemo(
    () =>
      productsData?.length ?? 0 > 0
        ? addKeysToObjectInArray<IProduct>({ array: [...productsData] })
        : [],
    [productsData]
  );

  const handleOpenEditModal = (product: IProduct) => {
    setIsOpenEditModal(true);
    setProductDataInModal(product);
  };

  const [
    deleteProduct,
    {
      isLoading: isDeleteProductLoading,
      isSuccess: isDeleteProductSuccess,
      status:deleteProductStatus,
      error: deleteProductError,
    },
  ] = useDeleteProductsMutation();

  const handleDeleteProduct = async (product: IProduct) => {
    await deleteProduct({ id: product.id });
  };

  useGetQueryMessages({
    isLoading: isDeleteProductLoading,
    isSuccess: isDeleteProductSuccess,
    status: deleteProductStatus,
    error: deleteProductError,
    successMessage: "Товар успешно удален.",
    errorMessage: "Произошла ошибка при удалении товара.",
  })

  const columns = [
    {
      title: productsAdminTableTitles.id,
      dataIndex: productsAdminTableDataIndexes.id,
      key: productsAdminTableDataIndexes.id,
    },
    {
      title: productsAdminTableTitles.image,
      dataIndex: productsAdminTableDataIndexes.image,
      key: productsAdminTableDataIndexes.image,
      render: (record: IImage) => (
        <img
          className={styles.productImage}
          src={getImageUrl(record.filename)}
          alt=""
        />
      ),
    },
    {
      title: productsAdminTableTitles.name,
      dataIndex: productsAdminTableDataIndexes.name,
      key: productsAdminTableDataIndexes.name,
    },
    {
      title: productsAdminTableTitles.description,
      dataIndex: productsAdminTableDataIndexes.description,
      key: productsAdminTableDataIndexes.description,
    },
    {
      title: productsAdminTableTitles.price,
      dataIndex: productsAdminTableDataIndexes.price,
      key: productsAdminTableDataIndexes.price,
    },
    {
      title: productsAdminTableTitles.type,
      dataIndex: productsAdminTableDataIndexes.type,
      key: productsAdminTableDataIndexes.type,
      render: (record: IType) => <>{record.name}</>,
    },
    {
      title: productsAdminTableTitles.actions,
      key: productsAdminTableDataIndexes.actionsKey,
      render: (record: IProduct) => (
        <>
          <Typography.Link onClick={() => handleOpenEditModal(record)}>
            Редактировать
          </Typography.Link>

          <Typography.Text className={styles.productsTabTableActionsDivider}>
            |
          </Typography.Text>

          <Popconfirm
            title="Вы действительно хотите удалить этот продукт?"
            onConfirm={() => handleDeleteProduct(record)}
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
      className={styles.productsTabTableWrapper}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      bordered
      locale={{ emptyText: EMPTY_ADMIN_TAB_TABLE_TEXT }}
      expandable={{
        expandedRowRender: (record) => (
          <>
            <Typography.Text>Характеристики товара:</Typography.Text>

            <Table
              className={styles.characteristicsProductTable}
              columns={adminProductCharacteristicsListColumns}
              locale={{ emptyText: EMPTY_CHARACTERISTICS_TEXT }}
              dataSource={record.characteristics}
              pagination={false}
              showHeader={false}
              size="small"
              bordered
            />
          </>
        ),
      }}
    />
  );
};
