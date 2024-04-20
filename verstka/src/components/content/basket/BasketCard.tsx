import { Card, Button, Image, InputNumber, Checkbox } from "antd"
import { useState } from "react"
import cls from "../../content/content.module.scss"
import type { ItemsType } from "./BasketList"
import type { CheckboxProps } from "antd"

const onChange: CheckboxProps["onChange"] = e => {
  console.log(`checked = ${e.target.checked}`)
}

const { Meta } = Card

const BasketCard: React.FC<{ card: ItemsType }> = ({ card }) => {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (value: number | string | undefined) => {
    // Проверяем, является ли значение числом, чтобы избежать ошибок
    if (typeof value === "number") {
      setQuantity(value)
    }
  }

  const sum = quantity * card.price

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Checkbox onChange={onChange} />
      <div className={cls.basket__card}>
        <div className={cls.basket__card__header}>
          <Image
            width={70}
            src="https://catherineasquithgallery.com/uploads/posts/2021-03/1614584821_10-p-vino-na-belom-fone-11.png"
          />
          <div>
            <h3>{card.name}</h3>
            <div className={cls.basket__card__price}>
              <h5>{card.price}$ </h5> за шт.
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "space-between", width: "150px", marginRight: "8px" }}>
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={handleQuantityChange}
            style={{ width: "80px", height: "30px" }}
          />
          <h4>{sum}$</h4>
        </div>
      </div>
    </div>
  )
}

export default BasketCard
