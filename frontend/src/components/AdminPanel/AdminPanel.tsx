import { Tabs, Typography } from "antd";

import { AdminImagesTab } from "components/AdminPanel/AdminImagesTab/AdminImagesTab";
import { AdminOrdersTab } from "components/AdminPanel/AdminOrdersTab/AdminOrdersTab";
import { AdminProductsTab } from "components/AdminPanel/AdminProductsTab/AdminProductsTab";
import { AdminTypesTab } from "components/AdminPanel/AdminTypesTab/AdminTypesTab";
import { AdminUsersTab } from "components/AdminPanel/AdminUsersTab/AdminUsersTab";

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
      label: "Категории товаров",
      children: <AdminTypesTab />,
    },
    {
      key: "4",
      label: "Заказы",
      children: <AdminOrdersTab />,
    },
    {
      key: "5",
      label: "Изображения",
      children: <AdminImagesTab />,
    },
  ];

  return (
    <>
      <Typography.Title>Управление магазином</Typography.Title>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};
