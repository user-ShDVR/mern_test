import React from "react";

import { DownOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Typography } from "antd";
import { Link } from "react-router-dom";

import { AuthModal } from "components/AuthModal/AuthModal";

import { useSignOutMutation } from "store/api/auth/auth-api";

import { RouterPath } from "configs/route-config";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./DropdownUser.module.scss";

type TDropdownItems = {
  label: React.ReactNode;
  key: string;
};

export const DropdownUser = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  const { authUserData, isUserAdmin } = useGetAuthUser();

  const [signOut] = useSignOutMutation();

  const handleLogout = () => {
    signOut();
  };

  const dropdownItems = [
    isUserAdmin && {
      label: (
        <Link to={RouterPath.admin_panel}>
          <Button type="link">
            <Typography.Text>Админ-панель</Typography.Text>
          </Button>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link to={RouterPath.account}>
          <Button type="link" block>
            <Typography.Text>Аккаунт</Typography.Text>
          </Button>
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Button type="link" block onClick={handleLogout}>
          <Typography.Text type="danger">Выйти</Typography.Text>
        </Button>
      ),
      key: "2",
    },
  ] as TDropdownItems[];

  const handleOpenModal = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <>
      {authUserData ? (
        <Dropdown
          key={authUserData.name}
          menu={{ items: dropdownItems }}
          placement="bottom"
          trigger={["click"]}
        >
          <div className={styles.dropdownWrapper}>
            <Avatar>{authUserData.name.slice(0, 2)}</Avatar>
            <Typography.Text>{authUserData.name}</Typography.Text>
            <DownOutlined className={styles.dropdownIcon} />
          </div>
        </Dropdown>
      ) : (
        <Button onClick={handleOpenModal}>Вход</Button>
      )}

      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
      />
    </>
  );
};
