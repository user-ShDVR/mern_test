import { Button, Image, Table, Typography } from "antd";
import styles from "./ProductItem.module.scss";
import { useProductsControllerFindOneQuery } from "../../store/api/defaultApi";
import { ShareAltOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { ShadowCard } from "../ShadowCard/ShadowCard";

export const ProductItem = () => {
  const productItemId = window.location.pathname.split("/")[3];

  const { data: productData } = useProductsControllerFindOneQuery({
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

  const imageUrl = `${import.meta.env.VITE_BASE_URL}/uploads/${
    productData?.image.filename
  }`;

  return (
    <>
      <Typography.Title>{productData?.name}</Typography.Title>

      <ShadowCard>
        <div className={styles.productItemWrapper}>
          <Image src={imageUrl} preview={false} />

          <div className={styles.productItemInfo}>
            <Typography.Title>{productData?.price} ₽</Typography.Title>

            <Button className={styles.button} type="primary" size="large">
              <ShoppingCartOutlined className={styles.buttonIcon} />В корзину
            </Button>

            <Typography.Title level={3}>Характеристики</Typography.Title>

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
