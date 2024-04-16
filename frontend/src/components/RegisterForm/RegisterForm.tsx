import { Button, Form, Typography, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import {
  AND_VALIDATE_MESSAGE,
  DEFAULT_VALIDATE_MESSAGE,
} from "../../constants/constants";
import { useRegisterMutation } from "../../store/api/authApi";
import { IUser } from "../../store/api/types";
import { Link, useNavigate } from "react-router-dom";
import { RouterPath } from "../AppRouter/routeConfig";
import { Page } from "../Page/Page";
import React from "react";
import { ProfileFields } from "./profileFields";

export const RegisterForm = () => {
  const [register, { isSuccess, isLoading, isError }] = useRegisterMutation();
  const navigate = useNavigate();

  const onFinishCreateQuestionnaire = (formValues: IUser) => {
    register({
      ...formValues,
      avatarUrl: formValues?.avatarUrl?.fileList[0]?.response?.location,
    });
  };

  React.useEffect(() => {
    if (!isLoading && isSuccess) {
      message.success("Профиль создан!");
      navigate(RouterPath.account);
    }

    if (isError) {
      message.error("Произошла ошибка при создании профиля");
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
      <Typography.Title>Создать профиль</Typography.Title>

      <Form
        layout="vertical"
        onFinish={onFinishCreateQuestionnaire}
        onFinishFailed={onFailedCreateQuestionnaire}
      >
        <ProfileFields />
        <Button type="primary" htmlType="submit">
          Зарегестрироваться
        </Button>

        <Link to={RouterPath.login}>
          <Button type="link">Есть аккаунт? Войти</Button>
        </Link>
      </Form>
    </Page>
  );
};
