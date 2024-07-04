import { Carousel, Typography, Button } from "antd";

import {
  assortmentProductsInMainEventsBlock,
  featuresInMainEventsBlock,
  sliderImagesInMainEventsBlock,
} from "constants/events-block-constants";

import styles from "./MainEventsBlock.module.scss";

export const MainEventsBlock = () => {
  return (
    <>
      <section className={styles.stocksWrapper}>
        <div>
          <Carousel
            className={styles.sliderWrapper}
            autoplay
            autoplaySpeed={2000}
          >
            {sliderImagesInMainEventsBlock.map((image) => (
              <img
                key={image.key}
                className={styles.sliderImage}
                src={image.src}
                alt={image.alt}
              />
            ))}
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

            <Button className={styles.feedbackButton}>Обратная связь</Button>
          </div>

          <div className={styles.lookingForWorkWrapper}>
            <Typography.Title className={styles.feedbackTitle} level={4}>
              В поисках работы?
            </Typography.Title>

            <Typography.Text className={styles.feedbackDescription}>
              Оставляй резюме, вливайся в команду!
            </Typography.Text>

            <Button className={styles.lookingForWorkButton}>
              Наши вакансии
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.featuresWrapper}>
        {featuresInMainEventsBlock.map((feature) => (
          <div className={styles.feature} key={feature.key}>
            <Typography.Text className={styles.featureText}>
              {feature.text}
            </Typography.Text>
          </div>
        ))}
      </section>

      <Typography.Title className={styles.eventsTitle}>
        У нас можно купить
      </Typography.Title>

      <section className={styles.productsAssortmentWrapper}>
        {assortmentProductsInMainEventsBlock.map((assortmentProduct) => (
          <div className={styles.assortmentProduct} key={assortmentProduct.key}>
            <img
              className={styles.assortmentProductImage}
              src={assortmentProduct.src}
              alt={assortmentProduct.alt}
            />
            <Typography.Text className={styles.assortmentProductHeader}>
              {assortmentProduct.text}
            </Typography.Text>
          </div>
        ))}
      </section>
    </>
  );
};
