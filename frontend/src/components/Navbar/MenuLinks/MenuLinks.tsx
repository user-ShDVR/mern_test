import {
  MenuOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Badge, Button, Typography } from "antd";
import { Link } from "react-router-dom";

import { RouterPath } from "configs/route-config";

import styles from "./MenuLinks.module.scss";
import { SearchInput } from "../SearchInput/SearchInput";

interface IMenuLinksProps {
  cartProductsDataCount?: number;
  handleCloseDrawer: () => void;
  className?: string;
}

export const MenuLinks = (props: IMenuLinksProps) => {
  const { cartProductsDataCount, handleCloseDrawer, className } = props;

  return (
    <div className={className}>
      <Link to={RouterPath.catalog} onClick={handleCloseDrawer}>
        <Button type="primary">
          <MenuOutlined />
          Каталог
        </Button>
      </Link>

      <SearchInput />

      <div className={styles.menuLinksIconsWrapper} onClick={handleCloseDrawer}>
        <Link className={styles.menuLinksIconWrapper} to={RouterPath.orders}>
          <ShoppingCartOutlined className={styles.menuLinksIcon} />
          <Typography.Text>Заказы</Typography.Text>
        </Link>

        <Link className={styles.menuLinksIconWrapper} to={RouterPath.cart}>
          <Badge count={cartProductsDataCount} showZero size="small">
            <InboxOutlined className={styles.icon} />
          </Badge>

          <Typography.Text>Корзина</Typography.Text>
        </Link>
      </div>
    </div>
  );
};
