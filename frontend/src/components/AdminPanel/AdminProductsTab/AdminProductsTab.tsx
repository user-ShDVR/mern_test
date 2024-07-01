import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Pagination, Spin, Tooltip, Typography } from "antd";

import { useGetProductsQuery } from "store/api/products/products-api";

import {
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_PRICE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
} from "constants/filters-constants";

import { useContexts } from "hooks/general/use-contexts";

import { getDeclination } from "utils/get-declination";

import { IProduct } from "types/IProduct";

import { AddProductModal } from "./AddProductModal/AddProductModal";
import styles from "./AdminProductsTab.module.scss";
import { EditProductModal } from "./EditProductModal/EditProductModal";
import { ProductsTabTable } from "./ProductsTabTable/ProductsTabTable";

export const AdminProductsTab = () => {
  const [productDataInModal, setProductDataInModal] = React.useState(
    {} as IProduct
  );

  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);

  const {
    currentPageContext: { currentPage, setCurrentPage },
    searchValueContext: { searchValue },
  } = useContexts();

  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery({
      page: currentPage,
      limit: 2,
      minPrice: DEFAULT_MIN_PRICE,
      maxPrice: DEFAULT_MAX_PRICE,
      sortBy: DEFAULT_SORT_BY,
      sortOrder: DEFAULT_SORT_ORDER,
      type: "",
      searchValue,
    });

  const isEmptyProductsData = productsData?.products.length === 0;

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

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isProductsLoading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Typography.Text className={styles.adminProductsTabTitle}>
        В системе - <b>{declinationProducts}</b>
      </Typography.Text>

      <Tooltip title="Добавить продукт.">
        <Button
          className={styles.adminProductsTabAddProductButton}
          onClick={handleOpenAddModal}
          icon={<PlusOutlined />}
        />
      </Tooltip>

      <ProductsTabTable
        productsData={productsData?.products ?? []}
        setIsOpenEditModal={setIsOpenEditModal}
        setProductDataInModal={setProductDataInModal}
      />

      {!isEmptyProductsData && (
        <Pagination
          className={styles.adminProductsTabPaginationWrapper}
          pageSize={2}
          total={productsData?.totalCount}
          onChange={handlePageChange}
          current={currentPage}
        />
      )}

      <AddProductModal
        isOpenAddModal={isOpenAddModal}
        onCloseAddModal={handleCloseAddModal}
      />

      <EditProductModal
        isOpenEditModal={isOpenEditModal}
        onCloseEditModal={handleCloseEditModal}
        productDataInModal={productDataInModal}
      />
    </>
  );
};
