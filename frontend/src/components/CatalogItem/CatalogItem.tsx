import { Card, Typography } from "antd";
import styles from "./CatalogItem.module.scss";
import { Filters } from "./Filters";
import { IProduct } from "../../types/IProduct";
import React from "react";
import { Link } from "react-router-dom";
import { EmptyMessage } from "../EmptyMessage/EmptyMessage";
import { ShadowCard } from "../ShadowCard/ShadowCard";
import { CartButtons } from "../CartButtons/CartButtons";
import { getImageUrl } from "../../utils/get-image-url";
import { useGetProductsQuery } from "../../store/api/products/products-api";
import { useGetPaginationBlock } from "../../hooks/use-get-pagination-block";
import {
  DEFAULT_MAX_PRICE_VALUE,
  DEFAULT_MIN_PRICE_VALUE,
  PRODUCTS_COUNT_IN_CATALOG_ITEM_PAGE,
} from "../../constants/products-constants";

export const CatalogItem = () => {
  const { currentPage, PaginationBlock } = useGetPaginationBlock();
  const [minValue, setMinValue] = React.useState(DEFAULT_MIN_PRICE_VALUE);
  const [maxValue, setMaxValue] = React.useState(DEFAULT_MAX_PRICE_VALUE);

  const [sortOrder, setSortOrder] = React.useState("asc");
  const [sortBy, setSortBy] = React.useState("price");

  const categoryType = window.location.pathname.split("/")[2];

  const { data: productsData } = useGetProductsQuery({
    page: currentPage,
    limit: PRODUCTS_COUNT_IN_CATALOG_ITEM_PAGE,
    minPrice: minValue,
    maxPrice: maxValue,
    type: categoryType,
    sortBy,
    sortOrder,
  });

  return (
    <>
      <Typography.Title>Вино</Typography.Title>

      <div className={styles.wrapper}>
        <ShadowCard className={styles.filtersWrapper}>
          <Typography.Title level={4}>Фильтры</Typography.Title>

          <Filters
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            setSortOrder={setSortOrder}
            setSortBy={setSortBy}
          />
        </ShadowCard>

        <div className={styles.productsWrapper}>
          {productsData?.products.length === 0 && (
            <EmptyMessage description="Товары не найдены" />
          )}

          {productsData?.products.map((product: IProduct) => {
            return (
              <Link
                className={styles.link}
                to={`${product.id}`}
                key={product.id}
              >
                <ShadowCard
                  className={styles.cardWrapper}
                  key={product.id}
                  cover={
                    <img
                      src={getImageUrl(product.image.filename)}
                      alt={product.name}
                    />
                  }
                >
                  <Card.Meta
                    title={
                      <>
                        <p className={styles.cardText}>{product.price} ₽</p>
                        <p className={styles.cardText}>{product.name}</p>
                      </>
                    }
                    description={<CartButtons productId={product.id} />}
                  />
                </ShadowCard>
              </Link>
            );
          })}
        </div>
      </div>

      <PaginationBlock
        countElementsOnPage={PRODUCTS_COUNT_IN_CATALOG_ITEM_PAGE}
        totalDataCount={productsData?.totalCount}
      />
    </>
  );
};
