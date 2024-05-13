import React from "react";

import styles from "./PageLayout.module.scss";

interface IPageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = (props: IPageLayoutProps) => {
  const { children } = props;

  return <div className={styles.pageLayoutWrapper}>{children}</div>;
};
