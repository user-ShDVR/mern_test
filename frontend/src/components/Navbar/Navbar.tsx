import { Button, Input, Typography } from "antd";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { RouterPath } from "../AppRouter/routeConfig";
import { InboxOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import DropdownUser from "./DropdownUser";

export const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <Link to={RouterPath.account}>
        <Button type="primary">Каталог</Button>
      </Link>

      <Input.Search className={styles.searchInput} placeholder="Найти товар" />

      <div className={styles.icons}>
        <div className={styles.iconWrapper}>
          <ShoppingCartOutlined className={styles.icon} />
          <Typography.Text>Заказы</Typography.Text>
        </div>

        <div className={styles.iconWrapper}>
          <InboxOutlined className={styles.icon} />
          <Typography.Text>Корзина</Typography.Text>
        </div>
      </div>

      <DropdownUser />
    </div>
  );
};
