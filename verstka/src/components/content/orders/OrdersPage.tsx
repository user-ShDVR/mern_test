import { Tag } from "antd"
import cls from "../content.module.scss"
import ModalCalendar from "./ModalCalendar"
import OrdersList from "./Order/OrdersList"



const OrdersPage : React.FC = () => {

  const date = "01.01.2025"
  const time = "11:00-14:00"
  const sum = "3000,00$"

    return (
      <div className={cls.orders}>
        <h1>Заказы</h1>
        <div>
          <div className={cls.order__header}>
              <h3>
                {date} {time} <Tag>В процессе</Tag>
              </h3>
              <h3>
                {sum}
              </h3>
          </div>
          <div>
            <OrdersList></OrdersList>
          </div>
        </div>
      </div>
    )
  
}

export default OrdersPage