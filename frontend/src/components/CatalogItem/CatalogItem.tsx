import { Button, Card, Pagination, Typography } from "antd";
import styles from "./CatalogItem.module.scss";
import { FilterSlider } from "./FilterSlider";
import { useProductsControllerFindAllQuery } from "../../store/api/defaultApi";
import { IProduct } from "../../types/IProduct";
import React from "react";

export const CatalogItem = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [minValue, setMinValue] = React.useState(1);
  const [maxValue, setMaxValue] = React.useState(10000);

  const categoryType = window.location.pathname.split("/")[2];

  const { data: productsData, refetch: refetchProductsData } =
    useProductsControllerFindAllQuery({
      page: currentPage,
      limit: 4,
      minPrice: minValue,
      maxPrice: maxValue,
      type: categoryType,
    });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetchProductsData();
  };

  return (
    <>
      <Typography.Title>Вино</Typography.Title>

      <div className={styles.wrapper}>
        <Card className={styles.filtersWrapper}>
          <Typography.Text className={styles.filtersTitle}>
            Фильтры
          </Typography.Text>

          <FilterSlider
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
          />
        </Card>

        <div className={styles.productsWrapper}>
          {productsData?.products.map((product: IProduct) => {
            const imageUrl = `${import.meta.env.VITE_BASE_URL}/uploads/${
              product.image.filename
            }`;

            return (
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
