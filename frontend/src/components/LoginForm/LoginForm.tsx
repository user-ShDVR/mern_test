import { Button, Form, Typography, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { ProfileFields } from "./ProfileFields";
import { IUser } from "../../store/api/types";
import { Link, useNavigate } from "react-router-dom";
import { RouterPath } from "../AppRouter/routeConfig";
import {
  AND_VALIDATE_MESSAGE,
  DEFAULT_VALIDATE_MESSAGE,
} from "../../constants/constants";
import { useLoginMutation } from "../../store/api/authApi";
import React from "react";
import { Page } from "../Page/Page";

export const LoginForm = () => {
  const [login, { isSuccess, isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();

  const onFinishCreateQuestionnaire = (formValues: IUser) => {
    login(formValues);
  };

  React.useEffect(() => {
    if (!isLoading && isSuccess) {
      message.success("Авторизация прошла успешно!");
      navigate(RouterPath.peoples);
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
    <Page>
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

        <Link to={RouterPath.register}>
          <Button type="link">Нет аккаунта? Зарегестрироваться</Button>
        </Link>
      </Form>
    </Page>
  );
};
