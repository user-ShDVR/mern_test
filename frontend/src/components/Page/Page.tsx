import React from "react";
import styles from "./Page.module.scss";

interface PageProps {
  children: React.ReactNode;
}

export const Page = (props: PageProps) => {
  const { children } = props;

  return <div className={styles.Page}>{children}</div>;
};
