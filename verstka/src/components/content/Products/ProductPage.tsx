import { Button, Image } from "antd"
import cls from "../content.module.scss"
import { Link } from "react-router-dom"

const ProductPage : React.FC = () => {

  const article = "2544352"
  
    return (
      <div className={cls.product}>
        <div className={cls.product__title}>
          <h1>Название</h1>
          <p>арт. {article}</p>
          <Link>Поделиться</Link>
        </div>
        <div className={cls.product__content}>
          <div>
            <Image
              width={400}
              src="https://catherineasquithgallery.com/uploads/posts/2021-03/1614584821_10-p-vino-na-belom-fone-11.png"
            />
          </div>
          <div className={cls.product__description}>
            <h1>100,00₽</h1>
            <Button type="primary" block className={cls.product__btn}>
              В корзину
            </Button>
            <div>Характеристики</div>
          </div>
        </div>
      </div>
    )
}

export default ProductPage
