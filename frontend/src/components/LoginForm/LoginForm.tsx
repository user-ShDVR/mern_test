import { Button, Form, Typography, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { ProfileFields } from "./ProfileFields";
import { SignInDto } from "../../store/api/types";
import { useNavigate } from "react-router-dom";
import {
  AND_VALIDATE_MESSAGE,
  DEFAULT_VALIDATE_MESSAGE,
} from "../../constants/profileConstants";
import React from "react";
import { useAuthControllerSignInMutation } from "../../store/api/defaultApi";

export const LoginForm = () => {
  const [login, { isSuccess, isLoading, isError }] =
    useAuthControllerSignInMutation();

  const navigate = useNavigate();

  const onFinishCreateQuestionnaire = (formValues: SignInDto) => {
    login({ signInDto: formValues });
  };

  React.useEffect(() => {
    if (!isLoading && isSuccess) {
      message.success("Авторизация прошла успешно!");
    }

    if (isError) {
      message.error("Неверный логин или пароль!");
    }
  }, [isError, isLoading, isSuccess, navigate]);

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
      </Form>
    </>
  );
};
