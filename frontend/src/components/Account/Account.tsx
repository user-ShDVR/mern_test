import React, { useState } from "react";
import { useGetMeQuery } from "../../store/api/authApi";
import { Page } from "../Page/Page";
import { Button, Form, Typography } from "antd";
import { AccountFields } from "./AccountFields";
import { useUpdateUserMutation } from "../../store/api/usersApi";
import { IUser } from "../../store/api/types";

export const Account: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data: userData, isLoading } = useGetMeQuery(null);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const onFinish = (formValues: IUser) => {
    updateUser({
      ...formValues,
      avatarUrl: formValues?.avatarUrl?.fileList[0]?.response?.location,
    });
    setIsEdit(!isEdit)
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Page>
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
    </Page>
  );
};
