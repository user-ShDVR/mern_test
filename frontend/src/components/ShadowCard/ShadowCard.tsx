import React from "react";

import { Card } from "antd";

import styles from "./ShadowCard.module.scss";

interface IShadowCardProps {
  children: React.ReactNode;
  className?: string;
  cover?: React.ReactNode;
}

export const ShadowCard = (props: IShadowCardProps) => {
  const { children, className, cover } = props;

  return (
    <Card className={`${styles.shadowCardWrapper} ${className}`} cover={cover}>
      {children}
    </Card>
  );
};
