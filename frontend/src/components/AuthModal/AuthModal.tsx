import { Modal } from "antd";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";
import React from "react";

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
