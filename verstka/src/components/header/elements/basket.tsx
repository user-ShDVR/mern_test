import { ShoppingCartOutlined } from "@ant-design/icons"
import { Badge } from "antd"
import { Link } from "react-router-dom"
import cls from "../header.module.scss"

const Basket: React.FC = () => {
  return (
    <Link to={"#"} className={cls.basket_order__link}>
      <Badge size="small" count={5} className={cls.basket_order__badge}>
        <ShoppingCartOutlined className={cls.basket_order__img} />
        <p className={cls.basket_order__txt}>Корзина</p>
      </Badge>
    </Link>
  )
}
export default Basket
