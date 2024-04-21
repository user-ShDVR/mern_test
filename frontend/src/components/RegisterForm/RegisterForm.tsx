import { Button, Form, Typography, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import {
  AND_VALIDATE_MESSAGE,
  DEFAULT_VALIDATE_MESSAGE,
} from "../../constants/profileConstants";
import { SignUpDto } from "../../store/api/types";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuthControllerSignUpMutation } from "../../store/api/defaultApi";
import { ProfileFields } from "./profileFields";

export const RegisterForm = () => {
  const [register, { isSuccess, isLoading, isError }] =
    useAuthControllerSignUpMutation();

  const navigate = useNavigate();

  const onFinishCreateQuestionnaire = (formValues: SignUpDto) => {
    register({ signUpDto: formValues });
  };

  React.useEffect(() => {
    if (!isLoading && isSuccess) {
      message.success("Профиль создан!");
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
    <>
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
      </Form>
    </>
  );
};
