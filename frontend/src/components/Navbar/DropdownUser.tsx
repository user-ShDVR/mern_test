import { DownOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Typography } from "antd";
import styles from "./Navbar.module.scss";
import React from "react";
import { AuthModal } from "../AuthModal/AuthModal";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/features/userSlice";
import { useAuthControllerSignOutMutation } from "../../store/api/defaultApi";

const DropdownUser = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const { user } = useSelector(selectUser);
  const [logout] = useAuthControllerSignOutMutation();

  const items = [
    {
      label: <Typography.Text onClick={() => {}}>Настройки</Typography.Text>,
      key: "0",
    },
    {
      label: (
        <Typography.Text onClick={() => logout()} type="danger">
          Выйти
        </Typography.Text>
      ),
      key: "1",
    },
  ];

  const handleOpenModal = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <>
      {user ? (
        <Dropdown menu={{ items }} placement="bottom">
          <div className={styles.dropdownWrapper}>
            <Avatar>{user.name.slice(0, 2)}</Avatar>
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

export default DropdownUser;
