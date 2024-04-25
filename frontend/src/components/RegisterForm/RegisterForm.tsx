import { Button, Form, Typography, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import {
  AND_VALIDATE_MESSAGE,
  DEFAULT_VALIDATE_MESSAGE,
} from "../../constants/profileConstants";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ProfileFields } from "./profileFields";
import { useSignUpMutation } from "../../store/api/auth/auth-api";
import { ISignInFields } from "../../store/api/auth/types";

interface RegisterFormProps {
  handleCloseModal: () => void;
  setIsHaveAccount: (isHaveAccount: boolean) => void;
}

export const RegisterForm = (props: RegisterFormProps) => {
  const { handleCloseModal, setIsHaveAccount } = props;

  const [register, { isSuccess, isLoading, isError }] = useSignUpMutation();

  const navigate = useNavigate();

  const onFinishCreateQuestionnaire = (formValues: ISignInFields) => {
    register({ ...formValues });
  };

  React.useEffect(() => {
    if (isSuccess) {
      message.success("Профиль создан!");
      setTimeout(() => handleCloseModal(), 600);
    }

    if (isError) {
      message.error("Произошла ошибка при создании профиля");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        <Button type="link" onClick={() => setIsHaveAccount(true)}>
          Есть аккаунт? Авторизоваться
        </Button>
      </Form>
    </>
  );
};
