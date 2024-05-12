import React from "react";

import { Button, Form, Typography, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { useSignInMutation } from "store/api/auth/auth-api";
import { ISignInFields } from "store/api/auth/types";

import { useGetLoginFields } from "hooks/auth/use-get-login-fields";

import { getValidateErrorMessage } from "utils/get-validate-error-message";

interface ILoginFormProps {
  handleCloseModal: () => void;
  setIsHaveAccount: (isHaveAccount: boolean) => void;
}

export const LoginForm = (props: ILoginFormProps) => {
  const { handleCloseModal, setIsHaveAccount } = props;

  const { FormItems } = useGetLoginFields();

  const [login, { isSuccess, isLoading, isError }] = useSignInMutation();

  const onFinishCreateQuestionnaire = (formValues: ISignInFields) => {
    login({ ...formValues });
  };

  React.useEffect(() => {
    if (!isLoading && isSuccess) {
      message.success("Авторизация прошла успешно!");
      setTimeout(() => handleCloseModal(), 600);
    }

    if (isError) {
      message.error("Неверный логин или пароль!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isLoading, isSuccess]);

  const onFailedCreateQuestionnaire = (formValues: ValidateErrorEntity) => {
    getValidateErrorMessage(formValues);
  };

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
