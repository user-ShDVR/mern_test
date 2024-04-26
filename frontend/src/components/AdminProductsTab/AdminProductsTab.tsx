import { useGetProductsQuery } from "../../store/api/products/products-api";
import { Spinner } from "../Spinner/Spinner";
import { Button, Table, Tag, Typography } from "antd";
import styles from "./AdminProductsTab.module.scss";
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

export const AdminProductsTab = () => {
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

  const declinationProducts = getDeclination({
    one: "товар",
    few: "товара",
    many: "товаров",
    value: productsData?.totalCount,
  });

  const handleOpenEditModal = (product: IProduct) => {
    setIsOpenEditModal(true);
    setCertainProductInModal(product);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
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
        <Button type="primary">Создать новый продукт</Button>
      </p>

      <div className={styles.productsWrapperCards}>
        {productsData?.products.map((product: IProduct) => (
          <ShadowCard className={styles.productCard} key={product.id}>
            <Button
              className={styles.editButton}
              block
              onClick={() => handleOpenEditModal(product)}
            >
              Редактировать
            </Button>

            <p>
              Идентификатор: <Tag>{product.id}</Tag>
            </p>

            <p className={styles.productField}>
              Изображение:
              <img
                className={styles.productImage}
                src={getImageUrl(product.image.filename)}
                alt=""
              />
            </p>

            <p className={styles.productField}>
              Название: <Tag>{product.name}</Tag>
            </p>

            <p className={styles.productField}>
              Описание:
              <Tag className={styles.productDescription}>
                {product.description}
              </Tag>
            </p>

            <p className={styles.productField}>
              Цена: <Tag>{product.price} ₽</Tag>
            </p>

            <p className={styles.productField}>
              Категория: <Tag>{product.type.name}</Tag>
            </p>

            <p className={styles.productField}>
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
    </>
  );
};
