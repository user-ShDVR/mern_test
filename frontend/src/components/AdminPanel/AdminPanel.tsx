import { Tabs, TabsProps, Typography } from "antd";
import { AdminClientsTab } from "../AdminClientsTab/AdminClientsTab";
import { AdminProductsTab } from "../AdminProductsTab/AdminProductsTab";

export const AdminPanel = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Клиенты",
      children: <AdminClientsTab />,
    },
    {
      key: "2",
      label: "Товары",
      children: <AdminProductsTab />,
    },
    {
      key: "3",
      label: "Каталоги товаров",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <>
      <Typography.Title>Админ панель</Typography.Title>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};
