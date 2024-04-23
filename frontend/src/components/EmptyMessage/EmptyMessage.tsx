import { Empty } from "antd";
import styles from "./EmptyMessage.module.scss";

interface EmptyMessageProps {
  description: string;
}

export const EmptyMessage = (props: EmptyMessageProps) => {
  const { description } = props;

  return (
    <Empty
      className={styles.wrapper}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={description}
    />
  );
};
