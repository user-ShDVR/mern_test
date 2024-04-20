import { Card, Button } from "antd"
import { useState } from "react"
import cls from "../../content.module.scss"
import type { ItemsType } from "./OrdersList"

const { Meta } = Card

const OrderCard: React.FC<{ card: ItemsType }> = ({ card }) => {
  const [inCart, setInCart] = useState(false)

  const handleCardClick = () => {
    console.log("клик на карточку")
  }

  return (
    <Card
      onClick={handleCardClick}
      hoverable
      style={{ width: 200 }}
      cover={
        <img
          alt="example"
          src="https://catherineasquithgallery.com/uploads/posts/2021-03/1614584821_10-p-vino-na-belom-fone-11.png"
        />
      }
    >
      <Meta title={card.name} />
      <h3 className={cls.order__price}>{card.price}</h3>
    </Card>
  )
}

export default OrderCard
