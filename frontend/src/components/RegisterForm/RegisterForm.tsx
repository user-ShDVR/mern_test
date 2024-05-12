import React from "react";

import { Button, Form, Typography, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { useNavigate } from "react-router-dom";

import { useSignUpMutation } from "store/api/auth/auth-api";
import { ISignInFields } from "store/api/auth/types";

import { useGetRegisterFields } from "hooks/auth/use-get-register-fields";

import { getValidateErrorMessage } from "utils/get-validate-error-message";

interface IRegisterFormProps {
  handleCloseModal: () => void;
  setIsHaveAccount: (isHaveAccount: boolean) => void;
}

export const RegisterForm = (props: IRegisterFormProps) => {
  const { handleCloseModal, setIsHaveAccount } = props;

  const { FormItems } = useGetRegisterFields();
  const navigate = useNavigate();

  const [register, { isSuccess, isLoading, isError }] = useSignUpMutation();

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
    getValidateErrorMessage(formValues);
  };

  return (
    <>
      <Typography.Title>Создать профиль</Typography.Title>

      <Form
        layout="vertical"
        onFinish={onFinishCreateQuestionnaire}
        onFinishFailed={onFailedCreateQuestionnaire}
      >
        {FormItems}

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
