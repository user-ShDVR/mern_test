import React from "react";

import { Modal } from "antd";

import { LoginForm } from "components/LoginForm/LoginForm";
import { RegisterForm } from "components/RegisterForm/RegisterForm";

interface IAuthModalProps {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthModal = (props: IAuthModalProps) => {
  const { isAuthModalOpen, setIsAuthModalOpen } = props;

  const [isHaveAccount, setIsHaveAccount] = React.useState(false);

  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <Modal open={isAuthModalOpen} footer={null} onCancel={handleCloseModal}>
      {isHaveAccount ? (
        <LoginForm
          handleCloseModal={handleCloseModal}
          setIsHaveAccount={setIsHaveAccount}
        />
      ) : (
        <RegisterForm
          handleCloseModal={handleCloseModal}
          setIsHaveAccount={setIsHaveAccount}
        />
      )}
    </Modal>
  );
};
