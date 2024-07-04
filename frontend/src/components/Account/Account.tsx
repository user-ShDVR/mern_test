import React from "react";

import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Spin, Typography, message } from "antd";

import { useEditUsersMutation } from "store/api/users/users-api";

import { useGetAccountFields } from "hooks/account/use-get-account-fields";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { IUser } from "types/IUser";

import styles from "./Account.module.scss";

export const Account = () => {
  const [isEditAccount, setIsEditAccount] = React.useState(false);

  const { authUserData, isUserDataLoading } = useGetAuthUser();

  const [
    editAccount,
    {
      isLoading: isEditAccountLoading,
      isSuccess: isEditAccountSuccess,
      isError: isEditAccountError,
    },
  ] = useEditUsersMutation();

  const { FormItems } = useGetAccountFields({
    authUserData,
    isEditAccount: !isEditAccount,
  });

  const loadedAccountFields = !isUserDataLoading && FormItems;

  const handleEditAccount = async (formValues: IUser) => {
    const editedData = {
      ...formValues,
      id: authUserData?.id,
    };

    await editAccount(editedData);
  };

  React.useEffect(() => {
    if (!isEditAccountLoading && isEditAccountSuccess) {
      message.success("Данные об аккаунте успешно обновлены");
      setIsEditAccount(false);
    } else if (!isEditAccountLoading && isEditAccountError) {
      message.error("Произошла ошибка при обновлении данных об аккаунте");
    }
  }, [isEditAccountSuccess, isEditAccountError, isEditAccountLoading]);

  const handleEdit = () => {
    setIsEditAccount(true);
  };

  const handleCancelEdit = () => {
    setIsEditAccount(false);
  };

  return (
    <>
      <Typography.Title>Ваш аккаунт</Typography.Title>

      {isUserDataLoading ? (
        <Spin size="large" />
      ) : (
        <Form layout="vertical" onFinish={handleEditAccount}>
          {loadedAccountFields}

          {!isEditAccount && (
            <Button onClick={handleEdit} type="primary">
              <EditOutlined />
              Редактировать
            </Button>
          )}

          {isEditAccount && (
            <>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>

              <Button
                className={styles.cancelEditButton}
                type="default"
                onClick={handleCancelEdit}
              >
                Отменить
              </Button>
            </>
          )}
        </Form>
      )}
    </>
  );
};
