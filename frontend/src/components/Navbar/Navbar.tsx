import { Button, Input, Typography } from "antd";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { RouterPath } from "../AppRouter/routeConfig";
import {
  InboxOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import DropdownUser from "./DropdownUser";

export const Navbar = () => {
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
          <InboxOutlined className={styles.icon} />
          <Typography.Text>Корзина</Typography.Text>
        </Link>
      </div>

      <DropdownUser />
    </div>
  );
};
