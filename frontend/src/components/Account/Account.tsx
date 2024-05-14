import React from "react";

import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Typography, message } from "antd";

import { Spinner } from "components/Spinner/Spinner";

import { useEditUsersMutation } from "store/api/users/users-api";

import { useGetAccountFields } from "hooks/account/use-get-account-fields";
import { useGetUser } from "hooks/user/use-get-user";

import styles from "./Account.module.scss";

export const Account = () => {
  const [isEditAccount, setIsEditAccount] = React.useState(false);

  const { userData, isUserDataLoading } = useGetUser();

  const [editAccount] = useEditUsersMutation();

  const { FormItems } = useGetAccountFields({
    userData,
    isEditAccount: !isEditAccount,
  });

  const loadedAccountFields = !isUserDataLoading && FormItems;

  const handleEditAccount = (formValues: Record<string, string>) => {
    editAccount({ id: userData?.id, ...formValues });

    message.success("Данные об аккаунте успешно обновлены");
    setIsEditAccount(false);
  };

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
        <Spinner />
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
