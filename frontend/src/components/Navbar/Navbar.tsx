import React from "react";

import {
  InboxOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Button, Drawer, Input, Typography } from "antd";
import { Link } from "react-router-dom";

import { DropdownUser } from "components/DropdownUser/DropdownUser";

import { RouterPath } from "configs/route-config";

import { useCartActions } from "hooks/cart/use-cart-actions";
import { useSearchProducts } from "hooks/products/use-search-products";

import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const [isOpenMenuDrawer, setIsOpenMenuDrawer] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const { cartProductsData } = useCartActions();
  const { handleSearchProducts } = useSearchProducts();

  const handleOpenDrawer = () => {
    setIsOpenMenuDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenMenuDrawer(false);
  };

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  React.useEffect(() => {
    if (windowWidth > 760 && isOpenMenuDrawer) {
      handleCloseDrawer();
    }
  }, [windowWidth, isOpenMenuDrawer]);

  const desktopMenu = (
    <div className={styles.desktopMenu}>
      <Link to={RouterPath.catalog} onClick={handleCloseDrawer}>
        <Button type="primary">
          <MenuOutlined />
          Каталог
        </Button>
      </Link>

      <Input.Search
        className={styles.searchInput}
        placeholder="Найти товар"
        onSearch={handleSearchProducts}
      />

      <div className={styles.icons} onClick={handleCloseDrawer}>
        <Link className={styles.iconWrapper} to={RouterPath.orders}>
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
    </div>
  );

  const mobileMenu = <div className={styles.mobileMenu}>{desktopMenu}</div>;

  return (
    <>
      <div className={styles.wrapper}>
        <Button
          className={styles.openMenuDrawerButton}
          type="primary"
          onClick={handleOpenDrawer}
        >
          Меню
        </Button>

        {desktopMenu}
        <DropdownUser />
      </div>

      <Drawer
        title="Меню"
        placement="left"
        onClose={handleCloseDrawer}
        open={isOpenMenuDrawer}
      >
        {mobileMenu}
      </Drawer>
    </>
  );
};
