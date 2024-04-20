import ProductCard from "./ProductCard"
import cls from "../content.module.scss"
import { Pagination } from "antd"
import { useState } from "react"

export type ItemsType = {
  name: string
  price: string
}

const ProductCardList: React.FC = () => {

  const itemsPerPage = 18 // Количество элементов на странице
  const [currentPage, setCurrentPage] = useState(1) // Текущая страница

  const items: ItemsType[] = [
    { name: "Вино", price: "1000$" },
    { name: "Коньяк", price: "500$" },
    { name: "Водка", price: "300$" },
    { name: "Самогон", price: "700$" },
    { name: "Кальвадос", price: "800$" },
    { name: "Пиво", price: "100$" },
    { name: "Виски", price: "1500$" },
    { name: "Мартини", price: "1200$" },
    { name: "Пьяный квас", price: "99999$" },
    { name: "Бруско 150мг", price: "10$" },
    { name: "Вино", price: "1000$" },
    { name: "Коньяк", price: "500$" },
    { name: "Водка", price: "300$" },
    { name: "Самогон", price: "700$" },
    { name: "Кальвадос", price: "800$" },
    { name: "Пиво", price: "100$" },
    { name: "Виски", price: "1500$" },
    { name: "Мартини", price: "1200$" },
    { name: "Пьяный квас", price: "99999$" },
    { name: "Бруско 150мг", price: "10$" },
    { name: "Вино", price: "1000$" },
    { name: "Коньяк", price: "500$" },
    { name: "Водка", price: "300$" },
    { name: "Самогон", price: "700$" },
    { name: "Кальвадос", price: "800$" },
    { name: "Пиво", price: "100$" },
    { name: "Виски", price: "1500$" },
    { name: "Мартини", price: "1200$" },
    { name: "Пьяный квас", price: "99999$" },
    { name: "Бруско 150мг", price: "10$" },
  ]

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div className={cls.card__list}>
        {getCurrentPageItems().map((item, index) => (
          <ProductCard key={index} card={item} />
        ))}
      </div>
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        total={items.length}
        pageSize={itemsPerPage}
        onChange={handleChangePage}
      />
    </div>
  )
}

export default ProductCardList
