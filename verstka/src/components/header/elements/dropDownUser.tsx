import { DownOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Dropdown } from "antd"
import Link from "antd/es/typography/Link"
import cls from "../header.module.scss"

const DropdownUser: React.FC<{
  setAuthorized: (value: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  authorized: boolean;
}> = ({ setAuthorized, authorized, isModalOpen, setIsModalOpen }) => {
  const clickLoginBtn = () => {
    setIsModalOpen(true)
  }

  const items = [
    {
      label: <Link>Настройки</Link>,
      key: "0",
    },
    {
      label: (
        <Link
          className={cls.dropdown__exit}
        >
          Выйти
        </Link>
      ),
      key: "1",
    },
  ]

  return (
    <>
      { authorized ? (    
          <Dropdown menu={{ items }} placement="bottom">
            <Link className={cls.dropdown__link} onClick={e => e.preventDefault()}>
              <Avatar className={cls.dropdown__avatar} icon={<UserOutlined />} />
              Иван Иванов
              <DownOutlined />
            </Link>
          </Dropdown>
        )  : <Button className={cls.login__btn} onClick={clickLoginBtn}>Вход</Button>
      }

    </>


  )
}

export default DropdownUser
