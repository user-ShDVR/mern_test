import BasketCard from "./BasketCard"
import cls from "../content.module.scss"

export type ItemsType = {
  name: string
  price: number
}

const BasketList: React.FC<{items: ItemsType[]}> = ({items}) => {


  return (
    <div className={cls.basket__list}>
      {items.slice(0).map((item, index) => (
        <BasketCard key={index} card={item} />
      ))}
    </div>
  )
}

export default BasketList
