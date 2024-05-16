import { Carousel, Typography, Button } from "antd";

import {
  assortmentProductsInEventsBlock,
  featuresInEventsBlock,
  sliderImagesInEventsBlock,
} from "constants/events-block-constants";

import styles from "./EventsBlock.module.scss";

export const EventsBlock = () => {
  return (
    <>
      <section className={styles.stocksWrapper}>
        <div>
          <Carousel
            className={styles.sliderWrapper}
            autoplay
            autoplaySpeed={2000}
          >
            {sliderImagesInEventsBlock.map((image) => (
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
      </section>

      <section className={styles.featuresWrapper}>
        {featuresInEventsBlock.map((feature) => (
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
        {assortmentProductsInEventsBlock.map((assortmentProduct) => (
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
