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
  DEFAULT_PRODUCTS_FILED_SORT_BY,
  DEFAULT_PRODUCTS_SORT_ORDER,
} from "constants/filters-constants";
import {
  PRODUCTS_COUNT_IN_ADMIN_PANEL_PAGE,
  adminProductCharacteristicsListColumns,
} from "constants/products-constants";

import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";
import { useSearchProducts } from "hooks/products/use-search-products";

import { getDeclination } from "utils/get-declination";
import { getImageUrl } from "utils/get-image-url";

import { IProduct } from "types/IProduct";

import { AddProductModal } from "./AddProductModal";
import { EditProductModal } from "./EditProductModal";

export const AdminProductsTab = () => {
  const [certainProductInModal, setCertainProductInModal] = React.useState(
    {} as IProduct
  );

  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);

  const { currentPage, PaginationBlock } = useGetPaginationBlock();
  const { searchValue } = useSearchProducts();

  const {
    data: productsData,
    isLoading: isProductsLoading,
    refetch: refetchProductsData,
  } = useGetProductsQuery({
    page: currentPage,
    limit: PRODUCTS_COUNT_IN_ADMIN_PANEL_PAGE,
    minPrice: DEFAULT_MIN_PRICE_VALUE,
    maxPrice: DEFAULT_MAX_PRICE_VALUE,
    sortBy: DEFAULT_PRODUCTS_FILED_SORT_BY,
    sortOrder: DEFAULT_PRODUCTS_SORT_ORDER,
    type: "",
    searchValue,
  });

  const isEmptyProductsData = productsData?.products.length === 0;

  const [
    deleteProduct,
    {
      isSuccess: isDeleteProductSuccess,
      isError: isDeleteProductError,
      isLoading: isDeleteProductLoading,
    },
  ] = useDeleteProductsMutation();

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

  const handleOpenEditModal = (product: IProduct) => {
    setIsOpenEditModal(true);
    setCertainProductInModal(product);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const handleDeleteProduct = async (product: IProduct) => {
    await deleteProduct({ id: product.id });
  };

  React.useEffect(() => {
    if (!isDeleteProductLoading && isDeleteProductSuccess) {
      message.success("Товар успешно удален");
      refetchProductsData();
    } else if (!isDeleteProductLoading && isDeleteProductError) {
      message.error("Произошла ошибка при удалении товара");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteProductSuccess, isDeleteProductError]);

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
          Создать новый товар
        </Button>
      </p>

      <div className={styles.entityWrapperCards}>
        {productsData?.products.map((product: IProduct) => (
          <ShadowCard className={styles.entityCard} key={product.id}>
            <Button
              className={styles.entityCardEditButton}
              type="primary"
              onClick={() => handleOpenEditModal(product)}
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
                className={styles.entityImage}
                src={getImageUrl(product.image.filename)}
                alt=""
              />
            </p>

            <p className={styles.entityField}>
              Название: <Tag>{product.name}</Tag>
            </p>

            <p className={styles.entityField}>
              Описание:{" "}
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
                className={styles.entityWideBlock}
                columns={adminProductCharacteristicsListColumns}
                dataSource={product.characteristics}
                pagination={false}
                showHeader={false}
                size="small"
                bordered
              />
            </p>
          </ShadowCard>
        ))}
      </div>

      {!isEmptyProductsData && (
        <PaginationBlock
          countElementsOnPage={PRODUCTS_COUNT_IN_ADMIN_PANEL_PAGE}
          totalCount={productsData?.totalCount}
        />
      )}

      <AddProductModal
        isOpenAddModal={isOpenAddModal}
        onCloseAddModal={handleCloseAddModal}
        refetchProductsData={refetchProductsData}
      />

      <EditProductModal
        isOpenEditModal={isOpenEditModal}
        onCloseEditModal={handleCloseEditModal}
        certainProductInModal={certainProductInModal}
        refetchProductsData={refetchProductsData}
      />
    </>
  );
};
