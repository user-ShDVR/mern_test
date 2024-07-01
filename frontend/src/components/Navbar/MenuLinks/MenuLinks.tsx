import {
  MenuOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Badge, Button, Input, Typography } from "antd";
import { Link } from "react-router-dom";

import { RouterPath } from "configs/route-config";

import { useContexts } from "hooks/general/use-contexts";

import styles from "./MenuLinks.module.scss";

interface IMenuLinksProps {
  cartProductsDataCount?: number;
  handleCloseDrawer: () => void;
  className?: string;
}

export const MenuLinks = (props: IMenuLinksProps) => {
  const { cartProductsDataCount, handleCloseDrawer, className } = props;

  const {
    searchValueContext: { setSearchValue },
  } = useContexts();

  const handleSearchProducts = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  return (
    <div className={className}>
      <Link to={RouterPath.catalog} onClick={handleCloseDrawer}>
        <Button type="primary">
          <MenuOutlined />
          Каталог
        </Button>
      </Link>

      <Input.Search
        className={styles.menuLinksSearchInput}
        placeholder="Найти..."
        onSearch={handleSearchProducts}
      />

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
