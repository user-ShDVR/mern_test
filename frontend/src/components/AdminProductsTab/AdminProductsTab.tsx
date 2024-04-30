import React from "react";

import { Button, Table, Tag, Typography, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";
import { ShadowCard } from "components/ShadowCard/ShadowCard";
import { Spinner } from "components/Spinner/Spinner";

import {
  useDeleteProductsMutation,
  useGetProductsQuery,
} from "store/api/products/products-api";

import {
  DEFAULT_MAX_PRICE_VALUE,
  DEFAULT_MIN_PRICE_VALUE,
  PRODUCTS_COUNT_IN_ADMIN_PANEL_PAGE,
  characteristicsListColumns,
} from "constants/products-constants";

import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";

import { getDeclination } from "utils/get-declination";
import { getImageUrl } from "utils/get-image-url";

import { IProduct } from "types/IProduct";

import { AddProductModal } from "./AddProductModal";
import { EditProductModal } from "./EditProductModal";

export const AdminProductsTab = () => {
  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);

  const { currentPage, PaginationBlock } = useGetPaginationBlock();

  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery({
      page: currentPage,
      limit: PRODUCTS_COUNT_IN_ADMIN_PANEL_PAGE,
      minPrice: DEFAULT_MIN_PRICE_VALUE,
      maxPrice: DEFAULT_MAX_PRICE_VALUE,
      type: "",
      sortBy: "name",
      sortOrder: "asc",
    });

  const [deleteProduct] = useDeleteProductsMutation();

  const declinationProducts = getDeclination({
    one: "товар",
    few: "товара",
    many: "товаров",
    value: productsData?.totalCount,
  });

  const handleOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setIsOpenAddModal(false);
  };

  const handleOpenEditModal = () => {
    setIsOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const handleDeleteProduct = (product: IProduct) => {
    deleteProduct({ id: String(product.id) });
    message.success("Продукт успешно удален");
  };

  if (isProductsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography.Text className={styles.countTitle}>
        В системе - <b>{declinationProducts}</b>
      </Typography.Text>

      <p className={styles.createButton}>
        <Button type="primary" onClick={handleOpenAddModal}>
          Создать новый продукт
        </Button>
      </p>

      <div className={styles.entityWrapperCards}>
        {productsData?.products.map((product: IProduct) => (
          <ShadowCard className={styles.entityCard} key={product.id}>
            <Button
              className={styles.entityCardEditButton}
              type="primary"
              onClick={() => handleOpenEditModal()}
            >
              Редактировать
            </Button>

            <Button
              className={styles.entityCardDeleteButton}
              onClick={() => handleDeleteProduct(product)}
            >
              Удалить
            </Button>

            <p>
              Идентификатор: <Tag>{product.id}</Tag>
            </p>

            <p className={styles.entityField}>
              Изображение:
              <img
                className={styles.productImage}
                src={getImageUrl(product.image.filename)}
                alt=""
              />
            </p>

            <p className={styles.entityField}>
              Название: <Tag>{product.name}</Tag>
            </p>

            <p className={styles.entityField}>
              Описание:
              <Tag className={styles.entityDescription}>
                {product.description}
              </Tag>
            </p>

            <p className={styles.entityField}>
              Цена: <Tag>{product.price} ₽</Tag>
            </p>

            <p className={styles.entityField}>
              Категория: <Tag>{product.type.name}</Tag>
            </p>

            <p className={styles.entityField}>
              Характеристики:
              <Table
                columns={characteristicsListColumns}
                dataSource={product.characteristics}
                pagination={false}
                showHeader={false}
                size="small"
                bordered
              />
            </p>

            <EditProductModal
              isOpenEditModal={isOpenEditModal}
              onCloseEditModal={handleCloseEditModal}
              certainProductInModal={product}
            />
          </ShadowCard>
        ))}
      </div>

      <PaginationBlock
        countElementsOnPage={PRODUCTS_COUNT_IN_ADMIN_PANEL_PAGE}
        totalCount={productsData?.totalCount}
      />

      <AddProductModal
        isOpenAddModal={isOpenAddModal}
        onCloseAddModal={handleCloseAddModal}
      />
    </>
  );
};
