import OrderCard from "./OrderCard"
import cls from "../../content.module.scss"
import { useState } from "react"
import { Button } from "antd"

export type ItemsType = {
  name: string
  price: string
}

const OrdersList: React.FC = () => {
  const [limit, setLimit] = useState(4) // Устанавливаем значение по умолчанию
  const [inCart, setInCart] = useState(false)

  const handleButtonClick = () => {
    if (inCart) {
      setLimit(4) // Если уже открыт весь заказ, устанавливаем лимит обратно в 4
    } else {
      setLimit(10000) // Иначе, устанавливаем лимит в 10000
    }
    setInCart(!inCart)
  }

  const items: ItemsType[] = [
    { name: "Вино", price: "1000$" },
    { name: "Коньяк", price: "500$" },
    { name: "Водка", price: "300$" },
    { name: "Самогон", price: "700$" },
    { name: "Кальвадос", price: "800$" },
    { name: "Пиво", price: "100$" },
    { name: "Пьяный квас", price: "99999$" },
    { name: "Бруско 150мг", price: "10$" },
  ]

  return (
    <div className={cls.orders__list}>
        {items.slice(0, limit).map((item, index) => (
          <OrderCard key={index} card={item} />
        ))}
      <Button onClick={handleButtonClick} className={cls.order__btn}>
        {inCart ? "Закрыть заказ" : "Открыть весь заказ"}
      </Button>
    </div>
  )
}

export default OrdersList
