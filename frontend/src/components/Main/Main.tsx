import React from "react";

import { Button, Carousel, Typography } from "antd";

import { AdaptiveDrawer } from "components/AdaptiveDrawer/AdaptiveDrawer";
import { ProductCardsList } from "components/ProductCardsList/ProductCardsList";
import { Spinner } from "components/Spinner/Spinner";

import { useGetProductsQuery } from "store/api/products/products-api";

import { PRODUCTS_COUNT_IN_MAIN_PAGE } from "constants/products-constants";

import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";
import { useGetProductsFilters } from "hooks/products/use-get-products-filters";
import { useSearchProducts } from "hooks/products/use-search-products";

import styles from "./Main.module.scss";

export const Main = () => {
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const { currentPage, PaginationBlock } = useGetPaginationBlock();
  const { searchValue } = useSearchProducts();

  const { FiltersAside, minValue, maxValue, sortOrder, sortBy } =
    useGetProductsFilters();

  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery({
      page: currentPage,
      limit: PRODUCTS_COUNT_IN_MAIN_PAGE,
      minPrice: minValue,
      maxPrice: maxValue,
      type: "",
      sortBy,
      sortOrder,
      searchValue,
    });

  const isEmptyProductsData = productsData?.products.length === 0;

  return (
    <>
      <div className={styles.stocksWrapper}>
        <div>
          <Carousel
            className={styles.sliderWrapper}
            autoplay
            autoplaySpeed={2000}
          >
            <img
              className={styles.sliderImage}
              src="https://i.ibb.co/6FJq51m/image.png"
              alt=""
            />

            <img
              className={styles.sliderImage}
              src="https://i.ibb.co/rcdG4Lw/image.png"
              alt=""
            />
          </Carousel>
        </div>

        <div>
          <div className={styles.feedbackWrapper}>
            <Typography.Title className={styles.feedbackTitle} level={4}>
              Есть вопрос или предложение?
            </Typography.Title>

            <Typography.Text className={styles.feedbackDescription}>
              Мы всегда на связи.
            </Typography.Text>

            <Button className={styles.feedbackButton}>
              <a href="https://t.me/BodyaBilder007" target="_blank">
                Обратная связь
              </a>
            </Button>
          </div>

          <div className={styles.lookingForWorkWrapper}>
            <Typography.Title className={styles.feedbackTitle} level={4}>
              В поисках работы?
            </Typography.Title>

            <Typography.Text className={styles.feedbackDescription}>
              Оставляй резюме, вливайся в команду!
            </Typography.Text>

            <Button className={styles.lookingForWorkButton}>
              <a href="https://hh.ru/" target="_blank">
                Наши вакансии
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.featuresWrapper}>
        <div className={styles.feature}>
          <Typography.Text className={styles.featureText}>
            300+ магазинов работает для тебя по УРФО
          </Typography.Text>
        </div>

        <div className={styles.feature}>
          <Typography.Text className={styles.featureText}>
            Выбирай из 150+ сортов разливных напитков
          </Typography.Text>
        </div>

        <div className={styles.feature}>
          <Typography.Text className={styles.featureText}>
            Рыба на любой вкус и огромный выбор снэков
          </Typography.Text>
        </div>

        <div className={styles.feature}>
          <Typography.Text className={styles.featureText}>
            1000+ товаров для дома и отдыха на природе
          </Typography.Text>
        </div>
      </div>

      <Typography.Title className={styles.mainTitle}>
        У нас можно купить
      </Typography.Title>

      <section className={styles.productsAssortmentWrapper}>
        <div className={styles.assortmentProduct}>
          <img
            className={styles.assortmentProductImage}
            src="https://i.1.creatium.io/d2/42/ae/644911f2a9f071f063adf8e330efd0d34f/520x783q8/1_220.jpg"
            alt=""
          />
          <Typography.Text className={styles.assortmentProductHeader}>
            ПИВО БАНОЧНОЕ И В БУТЫЛКАХ
          </Typography.Text>
        </div>

        <div className={styles.assortmentProduct}>
          <img
            className={styles.assortmentProductImage}
            src="https://i.1.creatium.io/disk2/46/ce/ba/23723d1001e75df6c56a806e583287a127/434x609q8/foodiesfeed_com_beer_macro5555.jpg"
            alt=""
          />
          <Typography.Text className={styles.assortmentProductHeader}>
            160+ СОРТОВ РАЗЛИВНЫХ НАПИТКОВ
          </Typography.Text>
        </div>

        <div className={styles.assortmentProduct}>
          <img
            className={styles.assortmentProductImage}
            src="https://i.1.creatium.io/5a/32/49/ff1a771ef834e3b98aa2c352e4268358f4/735x490q8/20221203_img_5296_min.jpg"
            alt=""
          />
          <Typography.Text className={styles.assortmentProductHeader}>
            РЫБКА АРОМАТНАЯ НА ЛЮБОЙ ВКУС
          </Typography.Text>
        </div>

        <div className={styles.assortmentProduct}>
          <img
            className={styles.assortmentProductImage}
            src="https://i.1.creatium.io/c3/df/26/b279ed5be3dbed92167ab567607e4a857d/669x460q8/image_5760757_10121922.png"
            alt=""
          />
          <Typography.Text className={styles.assortmentProductHeader}>
            СНЭКИ
          </Typography.Text>
        </div>

        <div className={styles.assortmentProduct}>
          <img
            className={styles.assortmentProductImage}
            src="https://i.1.creatium.io/db/5d/82/95c4a19e3e555c48fed37464412758721a/690x460q8/1_min.jpg"
            alt=""
          />
          <Typography.Text className={styles.assortmentProductHeader}>
            СЫР
          </Typography.Text>
        </div>

        <div className={styles.assortmentProduct}>
          <img
            className={styles.assortmentProductImage}
            src="https://i.1.creatium.io/df/05/66/4e9555f4bd41128278f7340701153673e4/655x492q8/1_339.jpg"
            alt=""
          />
          <Typography.Text className={styles.assortmentProductHeader}>
            МЯСНЫЕ И РЫБНЫЕ ЗАКУСКИ
          </Typography.Text>
        </div>

        <div className={styles.assortmentProduct}>
          <img
            className={styles.assortmentProductImage}
            src="https://i.1.creatium.io/disk2/3c/07/3d/29f6920e559eb945203719b44cd59adbb7/738x492q8/close_up_of_burning_coal_on_metal_grill_royalty_free_image_1.jpg"
            alt=""
          />
          <Typography.Text className={styles.assortmentProductHeader}>
            ТОВАРЫ ДЛЯ ДОМА И ОТДЫХА
          </Typography.Text>
        </div>

        <div className={styles.assortmentProduct}>
          <img
            className={styles.assortmentProductImage}
            src="https://i.1.creatium.io/disk2/ec/65/4a/8fffb4bdf15ea97e7a68b23fb490cc2a56/434x651q8/foodiesfeed_com_pasta.jpg"
            alt=""
          />
          <Typography.Text className={styles.assortmentProductHeader}>
            ПРОДУКТЫ НА КАЖДЫЙ ДЕНЬ
          </Typography.Text>
        </div>
      </section>

      <Typography.Title className={styles.mainTitle}>
        Наши товары
      </Typography.Title>

      <Button
        className={styles.openFiltersMobileButton}
        type="primary"
        onClick={handleOpenDrawer}
      >
        Фильтры
      </Button>

      <AdaptiveDrawer
        title="Фильтры"
        drawerPlacement="right"
        handleCloseDrawer={handleCloseDrawer}
        isOpenDrawer={isOpenDrawer}
        customWindowWidth={1200}
      >
        {FiltersAside}
      </AdaptiveDrawer>

      {isProductsLoading ? (
        <Spinner />
      ) : (
        <div className={styles.mainWrapper}>
          <div className={styles.filtersWrapper}>{FiltersAside}</div>
          <ProductCardsList productsData={productsData?.products} />
        </div>
      )}

      {!isEmptyProductsData && (
        <PaginationBlock
          countElementsOnPage={PRODUCTS_COUNT_IN_MAIN_PAGE}
          totalCount={productsData?.totalCount}
        />
      )}
    </>
  );
};
