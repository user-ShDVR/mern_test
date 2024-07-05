import { Button, Form, Typography } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { useSignInMutation } from "store/api/auth/auth-api";

import { useGetLoginFields } from "hooks/auth/use-get-login-fields";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";

import { getValidateErrorMessage } from "utils/get-validate-error-message";

import { IUser } from "types/IUser";

interface ILoginFormProps {
  handleCloseModal: () => void;
  setIsHaveAccount: (isHaveAccount: boolean) => void;
}

export const LoginForm = (props: ILoginFormProps) => {
  const { handleCloseModal, setIsHaveAccount } = props;

  const { FormItems } = useGetLoginFields();

  const [
    login,
    {
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
      status: loginStatus,
      error: loginError,
    },
  ] = useSignInMutation();

  const onFinishCreateQuestionnaire = (formValues: IUser) => {
    login(formValues);
    setTimeout(() => handleCloseModal(), 1000);
  };

  const onFailedCreateQuestionnaire = (formValues: ValidateErrorEntity) => {
    getValidateErrorMessage(formValues);
  };

  useGetQueryMessages({
    isLoading: isLoginLoading,
    isSuccess: isLoginSuccess,
    status: loginStatus,
    error: loginError,
    successMessage: "Авторизация прошла успешно.",
    errorMessage: "Неверный логин или пароль.",
  });

  return (
    <>
      <Typography.Title>Авторизоваться</Typography.Title>

      <Form
        layout="vertical"
        onFinish={onFinishCreateQuestionnaire}
        onFinishFailed={onFailedCreateQuestionnaire}
      >
        {FormItems}

        <Button type="primary" htmlType="submit">
          Авторизоваться
        </Button>

        <Button type="link" onClick={() => setIsHaveAccount(false)}>
          Нет аккаунта? Зарегистрироваться
        </Button>
      </Form>
    </>
  );
};
