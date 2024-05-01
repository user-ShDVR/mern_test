import React from "react";

import styles from "./Page.module.scss";

interface IPageProps {
  children: React.ReactNode;
}

export const Page = (props: IPageProps) => {
  const { children } = props;

  return <div className={styles.wrapper}>{children}</div>;
};
