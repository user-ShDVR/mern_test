import { Breadcrumb, Layout, theme } from "antd"
import ProductCardList from "./Products/ProductCardList"
import Filter from "./search/filter"
import ProductPage from './Products/ProductPage';
import OrdersPage from "./orders/OrdersPage";
import BasketPage from "./basket/BasketPage";


const { Content } = Layout

const ContentComponent: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()


  return (
    <Content style={{ padding: "0 48px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          display: "flex",
          gap: "16px",
        }}
      >
        <Filter />
        <ProductCardList/>
      </div>
    </Content>
  )
}

export default ContentComponent
