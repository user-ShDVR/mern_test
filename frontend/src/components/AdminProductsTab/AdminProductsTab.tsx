import {
  useDeleteProductsMutation,
  useGetProductsQuery,
} from "../../store/api/products/products-api";
import { Spinner } from "../Spinner/Spinner";
import { Button, Table, Tag, Typography, message } from "antd";
import styles from "../AdminPanel/AdminPanelTab.module.scss";
import { IProduct } from "../../types/IProduct";
import { ShadowCard } from "../ShadowCard/ShadowCard";
import { getDeclination } from "../../utils/get-declination";
import { useGetPaginationBlock } from "../../hooks/use-get-pagination-block";
import {
  DEFAULT_MAX_PRICE_VALUE,
  DEFAULT_MIN_PRICE_VALUE,
  PRODUCTS_COUNT_IN_ADMIN_PANEL_PAGE,
  characteristicsListColumns,
} from "../../constants/products-constants";
import { getImageUrl } from "../../utils/get-image-url";
import React from "react";
import { EditProductModal } from "./EditProductModal";
import { AddProductModal } from "./AddProductModal";

export const AdminProductsTab = () => {
  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);

  const [certainProductInModal, setCertainProductInModal] = React.useState(
    {} as IProduct
  );

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

  const handleOpenEditModal = (product: IProduct) => {
    setIsOpenEditModal(true);
    setCertainProductInModal(product);
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
          </ShadowCard>
        ))}
      </div>

      <PaginationBlock
        countElementsOnPage={PRODUCTS_COUNT_IN_ADMIN_PANEL_PAGE}
        totalDataCount={productsData?.totalCount}
      />

      <EditProductModal
        isOpenEditModal={isOpenEditModal}
        onCloseEditModal={handleCloseEditModal}
        certainProductInModal={certainProductInModal}
      />

      <AddProductModal
        isOpenAddModal={isOpenAddModal}
        onCloseAddModal={handleCloseAddModal}
      />
    </>
  );
};
