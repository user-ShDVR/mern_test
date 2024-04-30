import React from "react";

import { Card } from "antd";

import styles from "./ShadowCard.module.scss";

interface ShadowCardProps {
  children: React.ReactNode;
  className?: string;
  cover?: React.ReactNode;
}

export const ShadowCard = (props: ShadowCardProps) => {
  const { children, className, cover } = props;

  return (
    <Card
      className={`${styles.wrapper} ${className}`}
      cover={cover}
    >
      {children}
    </Card>
  );
};
