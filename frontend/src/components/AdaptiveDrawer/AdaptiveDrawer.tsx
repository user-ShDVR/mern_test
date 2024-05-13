import React from "react";

import { Drawer } from "antd";

import { TDrawerPlacement } from "types/TDrawerPlacement";

interface IAdaptiveDrawerProps {
  children: React.ReactNode;
  title: string;
  drawerPlacement: TDrawerPlacement;
  isOpenDrawer: boolean;
  handleCloseDrawer: () => void;
  customWindowWidth: number;
}

export const AdaptiveDrawer = (props: IAdaptiveDrawerProps) => {
  const {
    children,
    title,
    drawerPlacement,
    isOpenDrawer,
    handleCloseDrawer,
    customWindowWidth,
  } = props;

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

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
    if (windowWidth > customWindowWidth && isOpenDrawer) {
      handleCloseDrawer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth, isOpenDrawer]);

  return (
    <Drawer
      title={title}
      placement={drawerPlacement}
      onClose={handleCloseDrawer}
      open={isOpenDrawer}
    >
      {children}
    </Drawer>
  );
};
