import { Button, Drawer } from "antd"
import { UnorderedListOutlined } from "@ant-design/icons"
import { useState } from "react"
import cls from "../header.module.scss"

const DrawerCatalog: React.FC = () => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={showDrawer}>
        <UnorderedListOutlined />
        Каталог
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Button className={cls.drawer__btn}>
            <h4 className={cls.drawer__btn__txt}>Вино</h4>
          </Button>
          <Button className={cls.drawer__btn}>
            <h4 className={cls.drawer__btn__txt}>Шампанское</h4>
          </Button>
          <Button className={cls.drawer__btn}>
            <h4 className={cls.drawer__btn__txt}>Коньяк</h4>
          </Button>
          <Button className={cls.drawer__btn}>
            <h4 className={cls.drawer__btn__txt}>Водка</h4>
          </Button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerCatalog
