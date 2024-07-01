import React from "react";

import { Popconfirm, Table, Typography, message } from "antd";

import { useDeleteProductsMutation } from "store/api/products/products-api";

import {
  adminProductCharacteristicsListColumns,
  emptyCharacteristicsText,
  productsAdminTableDataIndexes,
  productsAdminTableTitles,
} from "constants/products-constants";

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
      isSuccess: isDeleteProductSuccess,
      isError: isDeleteProductError,
      isLoading: isDeleteProductLoading,
    },
  ] = useDeleteProductsMutation();

  const handleDeleteProduct = async (product: IProduct) => {
    await deleteProduct({ id: product.id });
  };

  React.useEffect(() => {
    if (!isDeleteProductLoading && isDeleteProductSuccess) {
      message.success("Товар успешно удален");
    } else if (!isDeleteProductLoading && isDeleteProductError) {
      message.error("Произошла ошибка при удалении товара");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteProductSuccess, isDeleteProductError]);

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
      columns={columns}
      dataSource={tableData}
      pagination={false}
      bordered
      expandable={{
        expandedRowRender: (record) => (
          <>
            <Typography.Text>Характеристики товара:</Typography.Text>

            <Table
              className={styles.characteristicsProductTable}
              columns={adminProductCharacteristicsListColumns}
              locale={{ emptyText: emptyCharacteristicsText }}
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
