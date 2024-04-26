import { Spin } from "antd";

import styles from "./Spinner.module.scss";

export const Spinner = () => {
  return <Spin className={styles.spinner} size="large" />;
};
