import React from "react";

import { DownOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Typography } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AuthModal } from "components/AuthModal/AuthModal";

import { useSignOutMutation } from "store/api/auth/auth-api";
import { selectUser } from "store/features/userSlice";

import { RouterPath } from "configs/route-config";

import { useGetUser } from "hooks/user/use-get-user";

import styles from "./Navbar.module.scss";

type TDropdownItems = {
  label: React.ReactNode;
  key: string;
};

export const DropdownUser = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isLogOut, setLogOut] = React.useState(false);

  const { user } = useSelector(selectUser);
  const { isUserAdmin } = useGetUser();

  const [signOut] = useSignOutMutation();

  const handleLogout = () => {
    signOut();
    setLogOut(true);
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
        <Button type="link" block onClick={handleLogout}>
          <Typography.Text type="danger">Выйти</Typography.Text>
        </Button>
      ),
      key: "1",
    },
  ] as TDropdownItems[];

  const handleOpenModal = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <>
      {user && !isLogOut ? (
        <Dropdown
          key={user.name}
          menu={{ items: dropdownItems }}
          placement="bottom"
        >
          <div className={styles.dropdownWrapper}>
            <Avatar>{user.name.slice(0, 2)}</Avatar>
            <Typography.Text>{user.name}</Typography.Text>
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
