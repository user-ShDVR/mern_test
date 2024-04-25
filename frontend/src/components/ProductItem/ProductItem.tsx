import { Button, Image, Table, Typography } from "antd";
import styles from "./ProductItem.module.scss";
import { ShareAltOutlined } from "@ant-design/icons";
import { ShadowCard } from "../ShadowCard/ShadowCard";
import { CartButtons } from "../CartButtons/CartButtons";
import { getImageUrl } from "../../utils/getImageUrl";
import { useGetCertainProductsQuery } from "../../store/api/products/products-api";

export const ProductItem = () => {
  const productItemId = window.location.pathname.split("/")[3];

  const { data: productData } = useGetCertainProductsQuery({
    id: productItemId,
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "key",
    },
    {
      title: "Age",
      dataIndex: "value",
    },
  ];

  const handleShared = () => {
    navigator.clipboard.writeText(window.location.href);
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
              columns={columns}
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
