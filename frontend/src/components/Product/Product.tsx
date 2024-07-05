import { ShareAltOutlined } from "@ant-design/icons";
import { Button, Table, Typography, message } from "antd";
import { useParams } from "react-router-dom";

import { CartButtons } from "components/Cart/CartButtons/CartButtons";
import { ImageInCard } from "components/ImageInCard/ImageInCard";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import { useGetCertainProductsQuery } from "store/api/products/products-api";

import {
  adminProductCharacteristicsListColumns,
  EMPTY_CHARACTERISTICS_TEXT,
} from "constants/products-constants";

import styles from "./Product.module.scss";

export const Product = () => {
  const { id } = useParams();
  const { data: productData } = useGetCertainProductsQuery({ id });

  const handleSharedLink = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success("Ссылка на товар скопирована в буфер обмена.");
  };

  return (
    <>
      <Typography.Title>{productData?.name}</Typography.Title>

      <ShadowCard>
        <div className={styles.productItemWrapper}>
          <ImageInCard
            className={styles.productItemImage}
            imageUrl={productData?.image.filename ?? ""}
          />

          <div className={styles.productItemInfo}>
            <Typography.Title>{productData?.price} ₽</Typography.Title>
            <CartButtons productId={Number(id)} />

            <Typography.Title className={styles.characteristicsTitle} level={3}>
              Характеристики
            </Typography.Title>

            <Table
              className={styles.characteristics}
              columns={adminProductCharacteristicsListColumns}
              dataSource={productData?.characteristics}
              pagination={false}
              showHeader={false}
              locale={{ emptyText: EMPTY_CHARACTERISTICS_TEXT }}
            />
          </div>

          <div className={styles.productItemInfo}>
            <Typography.Title level={3}>Описание</Typography.Title>

            <Typography.Text className={styles.description}>
              {productData?.description}
            </Typography.Text>

            <Button className={styles.shareButton} onClick={handleSharedLink}>
              <ShareAltOutlined /> Поделиться
            </Button>
          </div>
        </div>
      </ShadowCard>
    </>
  );
};
