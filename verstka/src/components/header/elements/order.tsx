import { InboxOutlined } from "@ant-design/icons"
import { Badge } from "antd"
import { Link } from "react-router-dom"
import cls from "../header.module.scss"

const Order: React.FC = props => {
  return (
    <Link to={"#"} className={cls.basket_order__link}>
      <Badge size="small" count={5} className={cls.basket_order__badge}>
        <InboxOutlined className={cls.basket_order__img} />
        <p className={cls.basket_order__txt}>Заказы</p>
      </Badge>
    </Link>
  )
}
export default Order
