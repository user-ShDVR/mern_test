import { Button, Form, Typography, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { ProfileFields } from "./ProfileFields";
import {
  AND_VALIDATE_MESSAGE,
  DEFAULT_VALIDATE_MESSAGE,
} from "../../constants/profile-constants";
import React from "react";
import { useSignInMutation } from "../../store/api/auth/auth-api";
import { ISignInFields } from "../../store/api/auth/types";

interface LoginFormProps {
  handleCloseModal: () => void;
  setIsHaveAccount: (isHaveAccount: boolean) => void;
}

export const LoginForm = (props: LoginFormProps) => {
  const { handleCloseModal, setIsHaveAccount } = props;

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
    const notFilledFields = formValues.errorFields
      .map((errorField) => errorField.errors)
      .join(", ")
      .replace(new RegExp(DEFAULT_VALIDATE_MESSAGE, "g"), "")
      .replace(/,([^,]*)$/, ` ${AND_VALIDATE_MESSAGE}$1`);

    message.error(
      <>
        Заполните обязательные поля!
        <p>
          Осталось заполнить - <b>{notFilledFields}</b>
        </p>
      </>
    );
  };

  return (
    <>
      <Typography.Title>Авторизоваться</Typography.Title>

      <Form
        layout="vertical"
        onFinish={onFinishCreateQuestionnaire}
        onFinishFailed={onFailedCreateQuestionnaire}
      >
        <ProfileFields />

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
