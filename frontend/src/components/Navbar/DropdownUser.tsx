import { DownOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Typography } from "antd";
import styles from "./Navbar.module.scss";
import React from "react";
import { AuthModal } from "../AuthModal/AuthModal";

const DropdownUser = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  const isHaveAccount = false;

  const items = [
    {
      label: <Typography.Text>Настройки</Typography.Text>,
      key: "0",
    },
    {
      label: <Typography.Text>Выйти</Typography.Text>,
      key: "1",
    },
  ];

  const handleOpenModal = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <>
      {isHaveAccount ? (
        <Dropdown menu={{ items }} placement="bottom">
          <div className={styles.dropdownWrapper}>
            <Avatar>ИИ</Avatar>
            <DownOutlined className={styles.dropdownIcon} />
          </div>
        </Dropdown>
      ) : (
        <Button onClick={handleOpenModal}>Вход</Button>
      )}

      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
        isHaveAccount={isHaveAccount}
      />
    </>
  );
};

export default DropdownUser;
