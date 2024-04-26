import { Button, Image, Table, Typography, message } from "antd";
import styles from "./ProductItem.module.scss";
import { ShareAltOutlined } from "@ant-design/icons";
import { ShadowCard } from "../ShadowCard/ShadowCard";
import { CartButtons } from "../CartButtons/CartButtons";
import { getImageUrl } from "../../utils/get-image-url";
import { useGetCertainProductsQuery } from "../../store/api/products/products-api";
import { characteristicsListColumns } from "../../constants/products-constants";

export const ProductItem = () => {
  const productItemId = window.location.pathname.split("/")[3];

  const { data: productData } = useGetCertainProductsQuery({
    id: productItemId,
  });

  const handleShared = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success("Ссылка скопирована в буфер обмена");
  };

  return (
    <>
      <Typography.Title>{productData?.name}</Typography.Title>

      <ShadowCard>
        <div className={styles.productItemWrapper}>
          <Image
            src={getImageUrl(productData?.image.filename)}
            preview={false}
          />

          <div className={styles.productItemInfo}>
            <Typography.Title>{productData?.price} ₽</Typography.Title>
            <CartButtons productId={Number(productItemId)} />

            <Typography.Title className={styles.characteristicsTitle} level={3}>
              Характеристики
            </Typography.Title>

            <Table
              className={styles.characteristics}
              columns={characteristicsListColumns}
              dataSource={productData?.characteristics}
              pagination={false}
              showHeader={false}
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
