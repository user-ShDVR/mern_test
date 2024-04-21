import React, { useState } from "react";
import { Button, Form, Typography } from "antd";
import { AccountFields } from "./AccountFields";
import { IUser } from "../../store/api/types";
import {
  useAuthControllerGetSesssionInfoQuery,
  useUsersControllerUpdateMutation,
} from "../../store/api/defaultApi";

export const Account: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { data: userData, isLoading } = useAuthControllerGetSesssionInfoQuery();

  const [updateUser, { isLoading: isUpdating }] =
    useUsersControllerUpdateMutation();

  const onFinish = (formValues: IUser) => {
    updateUser({
      id: userData?.id,
      formValues,
    });
    setIsEdit(!isEdit);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Typography.Title level={2}>Профиль</Typography.Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 400 }}
        initialValues={userData}
        disabled={isUpdating}
      >
        <AccountFields userData={userData} isEdit={isEdit} />
        <Form.Item>
          <Button block type="primary" onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? "Отмена" : "Изменить данные"}
          </Button>
          <br />
          <br />

          {isEdit && (
            <Button block type="primary" htmlType="submit">
              Сохранить изменения
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};
