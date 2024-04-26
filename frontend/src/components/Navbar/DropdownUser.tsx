import { DownOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Typography } from "antd";
import styles from "./Navbar.module.scss";
import React from "react";
import { AuthModal } from "../AuthModal/AuthModal";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/features/userSlice";
import { useSignOutMutation } from "../../store/api/auth/auth-api";
import { Link } from "react-router-dom";
import { RouterPath } from "../../configs/route-сonfig";

type ItemType = {
  label: React.ReactNode;
  key: string;
};

export const DropdownUser = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const { user } = useSelector(selectUser);
  const [signOut] = useSignOutMutation();

  const handleLogout = () => {
    signOut();
  };

  const items = [
    user?.role === "admin" && {
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
  ] as ItemType[];

  const handleOpenModal = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <>
      {user ? (
        <Dropdown menu={{ items }} placement="bottom">
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
