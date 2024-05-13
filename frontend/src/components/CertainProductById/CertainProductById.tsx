import { ShareAltOutlined } from "@ant-design/icons";
import { Button, Table, Typography, message } from "antd";
import { useParams } from "react-router-dom";

import { CartButtons } from "components/CartButtons/CartButtons";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import { useGetCertainProductsQuery } from "store/api/products/products-api";

import {
  adminProductCharacteristicsListColumns,
  emptyCharacteristicsText,
} from "constants/products-constants";

import { getImageUrl } from "utils/get-image-url";

import styles from "./CertainProductById.module.scss";

export const CertainProductById = () => {
  const { id } = useParams();

  const { data: productData } = useGetCertainProductsQuery({
    id,
  });

  const handleShared = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success("Ссылка на товар скопирована в буфер обмена");
  };

  return (
    <>
      <Typography.Title>{productData?.name}</Typography.Title>

      <ShadowCard>
        <div className={styles.productItemWrapper}>
          <img
            className={styles.productItemImage}
            src={getImageUrl(productData?.image.filename ?? "")}
            alt=""
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
              locale={{ emptyText: emptyCharacteristicsText }}
            />
          </div>

          <div className={styles.productItemInfo}>
            <Typography.Title level={3}>Описание</Typography.Title>

            <Typography.Text className={styles.description}>
              {productData?.description}
            </Typography.Text>

            <Button className={styles.shareButton} onClick={handleShared}>
              <ShareAltOutlined /> Поделиться
            </Button>
          </div>
        </div>
      </ShadowCard>
    </>
  );
};
