import { Button, Card, Pagination, Typography } from "antd";
import styles from "./CatalogItem.module.scss";
import { Filters } from "./Filters";
import { useProductsControllerFindAllQuery } from "../../store/api/defaultApi";
import { IProduct } from "../../types/IProduct";
import React from "react";
import { Link } from "react-router-dom";
import { EmptyMessage } from "../EmptyMessage/EmptyMessage";
import { ShadowCard } from "../ShadowCard/ShadowCard";
import { CartActions, useCartActions } from "../../utils/cart-actionts";

export const CatalogItem = () => {
  const { handleActionCart } = useCartActions();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [minValue, setMinValue] = React.useState(1);
  const [maxValue, setMaxValue] = React.useState(100000);

  const [sortOrder, setSortOrder] = React.useState("asc");
  const [sortBy, setSortBy] = React.useState("price");

  const categoryType = window.location.pathname.split("/")[2];

  const { data: productsData } = useProductsControllerFindAllQuery({
    page: currentPage,
    limit: 4,
    minPrice: minValue,
    maxPrice: maxValue,
    type: categoryType,
    sortBy,
    sortOrder,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isProductInCart = true;

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
            const imageUrl = `${import.meta.env.VITE_BASE_URL}/uploads/${
              product.image.filename
            }`;
            return (
              <Link
                className={styles.link}
                to={`${product.id}`}
                key={product.id}
              >
                <ShadowCard
                  className={styles.cardWrapper}
                  key={product.id}
                  cover={<img src={imageUrl} alt={product.name} />}
                >
                  <Card.Meta
                    title={
                      <>
                        <p className={styles.cardText}>{product.price} ₽</p>
                        <p className={styles.cardText}>{product.name}</p>
                      </>
                    }
                    description={
                      isProductInCart ? (
                        <Button
                          className={styles.cardButton}
                          type="primary"
                          onClick={(e) =>
                            handleActionCart({
                              productId: product.id,
                              action: CartActions.ADD,
                              eventButton: e,
                            })
                          }
                        >
                          В корзину
                        </Button>
                      ) : (
                        <Button
                          className={styles.cardButton}
                          onClick={(e) =>
                            handleActionCart({
                              productId: product.id,
                              action: CartActions.DELETE,
                              eventButton: e,
                            })
                          }
                        >
                          В корзине
                        </Button>
                      )
                    }
                  />
                </ShadowCard>
              </Link>
            );
          })}
        </div>
      </div>

      <Pagination
        className={styles.paginationWrapper}
        defaultCurrent={1}
        defaultPageSize={4}
        total={productsData?.totalCount}
        showSizeChanger={false}
        onChange={handlePageChange}
        current={currentPage}
      />
    </>
  );
};
