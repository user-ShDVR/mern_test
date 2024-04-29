import { UploadButton } from "../UploadButton/UploadButton";
import styles from "../AdminPanel/AdminPanelTab.module.scss";
import { Typography } from "antd";

export const AdminImagesTab = () => {
  return (
    <>
      <Typography.Text className={styles.countTitle}>
        Перетащите или загрузите изображение вручную
      </Typography.Text>
      <UploadButton />
    </>
  );
};
