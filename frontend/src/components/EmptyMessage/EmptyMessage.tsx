import { Empty } from "antd";

import styles from "./EmptyMessage.module.scss";

interface IEmptyMessageProps {
  description: string;
}

export const EmptyMessage = (props: IEmptyMessageProps) => {
  const { description } = props;

  return (
    <Empty
      className={styles.wrapper}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={description}
    />
  );
};
