import cls from "../content.module.scss"
import BasketList, { ItemsType } from "./BasketList"
import { Button, Checkbox, Divider } from "antd"
import type { CheckboxProps } from "antd"

const onChange: CheckboxProps["onChange"] = e => {
  console.log(`checked = ${e.target.checked}`)
}

const BasketPage: React.FC = () => {

  
  const items: ItemsType[] = [
    { name: "Вино", price: 1000 },
    { name: "Коньяк", price: 500 },
    { name: "Водка", price: 300 },
    { name: "Самогон", price: 700 },
    { name: "Кальвадос", price: 800 },
    { name: "Пиво", price: 100 },
    { name: "Пьяный квас", price: 99999 },
    { name: "Бруско 150мг", price: 10 },
  ]

  const sumOfAll = items.reduce((acc, item) => acc + item.price, 0)

  return (
    <div>
      <h1>Корзина</h1>
      <div className={cls.basket}>
        <div style={{ gap: "8px", display: "flex", flexDirection: "column" }}>
          <div className={cls.basket__header}>
            <Checkbox onChange={onChange}>Выбрать все</Checkbox>
            <Button danger>Удалить</Button>
          </div>
          <div>
            <BasketList items={items}/>
          </div>
        </div>

        <div>
          <div className={cls.basket__menu}>
            <p>Итог</p>
            <h3>{sumOfAll}$</h3>
          </div>
          <Divider style={{ marginTop: "0" }} />
          <Button block type="primary">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BasketPage
