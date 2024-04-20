import { Layout } from "antd"
import Search from "antd/es/input/Search"
import DropdownUser from "./elements/dropDownUser"
import { Link } from "react-router-dom"
import Basket from "./elements/basket"
import Order from "./elements/order"
import DrawerCatalog from "./elements/drawer"
import cls from "./header.module.scss"
import { useState } from "react"
import Login from "./elements/login"

const { Header } = Layout

const HeaderComponent: React.FC = () => {
  const [authorized, setAuthorized] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Header className={cls.header}>
      <div className={cls.logo}>Юзай БЭМ</div>
      <div className={cls.navbar}>
        <div className={cls.catalog}>
          <DrawerCatalog />
          <Search placeholder="Поиск" enterButton />
        </div>
        <div className={cls.menu}>
          <Order />
          <Basket/>
          <DropdownUser authorized={authorized} setAuthorized={setAuthorized} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </div>
      </div>
      <Login authorized={authorized} setAuthorized={setAuthorized} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Header>
  )
}

export default HeaderComponent
