import { Modal } from "antd";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";

interface IAuthModalProps {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHaveAccount: boolean;
}

export const AuthModal = (props: IAuthModalProps) => {
  const { isAuthModalOpen, setIsAuthModalOpen, isHaveAccount } = props;

  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <Modal open={isAuthModalOpen} footer={null} onCancel={handleCloseModal}>
      {!isHaveAccount ? <LoginForm /> : <RegisterForm />}
    </Modal>
  );
};
