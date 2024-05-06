import {
  InboxOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Button, Input, Typography } from "antd";
import { Link } from "react-router-dom";

import { RouterPath } from "configs/route-config";

import { useCartActions } from "hooks/cart/use-cart-actions";

import { DropdownUser } from "./DropdownUser";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const { cartProductsData } = useCartActions();

  return (
    <div className={styles.wrapper}>
      <Link to={RouterPath.catalog}>
        <Button type="primary">
          <MenuOutlined />
          Каталог
        </Button>
      </Link>

      <Input.Search className={styles.searchInput} placeholder="Найти товар" />

      <div className={styles.icons}>
        <Link className={styles.iconWrapper} to="">
          <ShoppingCartOutlined className={styles.icon} />
          <Typography.Text>Заказы</Typography.Text>
        </Link>

        <Link className={styles.iconWrapper} to={RouterPath.cart}>
          <Badge
            count={cartProductsData?.carts_products?.length}
            showZero
            size="small"
          >
            <InboxOutlined className={styles.icon} />
          </Badge>

          <Typography.Text>Корзина</Typography.Text>
        </Link>
      </div>

      <DropdownUser />
    </div>
  );
};
