import { Button, Card, Empty, Pagination, Typography } from "antd";
import styles from "./CatalogItem.module.scss";
import { Filters } from "./Filters";
import { useProductsControllerFindAllQuery } from "../../store/api/defaultApi";
import { IProduct } from "../../types/IProduct";
import React from "react";
import { Link } from "react-router-dom";

export const CatalogItem = () => {
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

  return (
    <>
      <Typography.Title>Вино</Typography.Title>

      <div className={styles.wrapper}>
        <Card className={styles.filtersWrapper}>
          <Typography.Title level={4}>Фильтры</Typography.Title>

          <Filters
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            setSortOrder={setSortOrder}
            setSortBy={setSortBy}
          />
        </Card>

        <div className={styles.productsWrapper}>
          {productsData?.products.length === 0 && (
            <Empty
              className={styles.emptyMessage}
              description="Товары не найдены"
            />
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
                <Card
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
                      <Button className={styles.cardButton} type="primary">
                        В корзину
                      </Button>
                    }
                  />
                </Card>
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
