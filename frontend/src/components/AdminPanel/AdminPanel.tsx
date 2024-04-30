import { Tabs, Typography } from "antd";

import { AdminImagesTab } from "components/AdminImagesTab/AdminImagesTab";
import { AdminProductsTab } from "components/AdminProductsTab/AdminProductsTab";
import { AdminTypesTab } from "components/AdminTypesTab/AdminTypesTab";
import { AdminUsersTab } from "components/AdminUsersTab/AdminUsersTab";

export const AdminPanel = () => {
  const items = [
    {
      key: "1",
      label: "Клиенты",
      children: <AdminUsersTab />,
    },
    {
      key: "2",
      label: "Товары",
      children: <AdminProductsTab />,
    },
    {
      key: "3",
      label: "Каталоги товаров",
      children: <AdminTypesTab />,
    },
    {
      key: "4",
      label: "Загрузить изображение",
      children: <AdminImagesTab />,
    },
  ];

  return (
    <>
      <Typography.Title>Админ панель</Typography.Title>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};
