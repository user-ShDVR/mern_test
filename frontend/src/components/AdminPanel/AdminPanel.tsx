import { Tabs, TabsProps, Typography } from "antd";
import { AdminUsersTab } from "../AdminUsersTab/AdminUsersTab";
import { AdminProductsTab } from "../AdminProductsTab/AdminProductsTab";
import { AdminTypesTab } from "../AdminTypesTab/AdminTypesTab";

export const AdminPanel = () => {
  const items: TabsProps["items"] = [
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
      children: "Content of Tab Pane 4",
    },
  ];

  return (
    <>
      <Typography.Title>Админ панель</Typography.Title>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};
