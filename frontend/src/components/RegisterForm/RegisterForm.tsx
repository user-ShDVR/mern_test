import { Button, Form, Typography } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { useSignUpMutation } from "store/api/auth/auth-api";

import { useGetRegisterFields } from "hooks/auth/use-get-register-fields";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";

import { getValidateErrorMessage } from "utils/get-validate-error-message";

import { IUser } from "types/IUser";

interface IRegisterFormProps {
  handleCloseModal: () => void;
  setIsHaveAccount: (isHaveAccount: boolean) => void;
}

export const RegisterForm = (props: IRegisterFormProps) => {
  const { handleCloseModal, setIsHaveAccount } = props;

  const { FormItems } = useGetRegisterFields();

  const [
    register,
    {
      isLoading: isSignUpLoading,
      isSuccess: isSignUpSuccess,
      status: signUpStatus,
      error: signUpError,
    },
  ] = useSignUpMutation();

  const onFinishCreateQuestionnaire = (formValues: IUser) => {
    register(formValues);
    setTimeout(() => handleCloseModal(), 1000);
  };

  const onFailedCreateQuestionnaire = (formValues: ValidateErrorEntity) => {
    getValidateErrorMessage(formValues);
  };

  useGetQueryMessages({
    isLoading: isSignUpLoading,
    isSuccess: isSignUpSuccess,
    status: signUpStatus,
    error: signUpError,
    successMessage: "Профиль создан!",
    errorMessage: "Произошла ошибка при создании профиля",
  })

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
