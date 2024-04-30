import { Typography } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";
import { UploadButton } from "components/UploadButton/UploadButton";

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
