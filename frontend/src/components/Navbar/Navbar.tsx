import React from "react";

import { Button } from "antd";
import { Link } from "react-router-dom";

import { AdaptiveDrawer } from "components/AdaptiveDrawer/AdaptiveDrawer";

import { RouterPath } from "configs/route-config";

import { useCartActions } from "hooks/cart/use-cart-actions";

import { DropdownUser } from "./DropdownUser/DropdownUser";
import { MenuLinks } from "./MenuLinks/MenuLinks";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const { cartProductsData } = useCartActions();

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const MenuMobileVersion = (
    <div className={styles.menuMobileVersion}>
      <MenuLinks
        className={styles.menuLinksWrapper}
        cartProductsDataCount={cartProductsData?.carts_products?.length}
        handleCloseDrawer={handleCloseDrawer}
      />
    </div>
  );

  return (
    <>
      <div className={styles.navbarWrapper}>
        <Link to={RouterPath.main}>
          <img
            className={styles.logo}
            src="https://i.ibb.co/CnrWQbF/image.png"
            alt=""
          />
        </Link>

        <Button
          className={styles.openMenuDrawerButton}
          type="primary"
          onClick={handleOpenDrawer}
        >
          Меню
        </Button>

        <MenuLinks
          className={styles.menuLinksWrapper}
          cartProductsDataCount={cartProductsData?.carts_products?.length}
          handleCloseDrawer={handleCloseDrawer}
        />

        <DropdownUser />
      </div>

      <AdaptiveDrawer
        title="Меню"
        drawerPlacement="left"
        handleCloseDrawer={handleCloseDrawer}
        isOpenDrawer={isOpenDrawer}
        customWindowWidth={927}
      >
        {MenuMobileVersion}
      </AdaptiveDrawer>
    </>
  );
};
