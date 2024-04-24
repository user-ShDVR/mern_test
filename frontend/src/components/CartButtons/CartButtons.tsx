import { Button } from "antd";
import { CartActions, useCartActions } from "../../hooks/use-cart-actionts";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

interface CartButtonsProps {
  productId: number;
}

export const CartButtons = (props: CartButtonsProps) => {
  const { productId } = props;

  const { handleActionCart, getIsProductInCart } = useCartActions();

  const handleAddToCart = (e) => {
    handleActionCart({
      productId: productId,
      action: CartActions.ADD,
      eventButton: e,
    });
  };

  const handleDeleteFromCart = (e) => {
    handleActionCart({
      productId: productId,
      action: CartActions.DELETE,
      eventButton: e,
    });
  };

  return !getIsProductInCart(productId) ? (
    <Button type="primary" onClick={(e) => handleAddToCart(e)} block>
      <ArrowDownOutlined />
      <ShoppingCartOutlined /> В корзину
    </Button>
  ) : (
    <Button onClick={(e) => handleDeleteFromCart(e)} block>
      <ArrowUpOutlined />
      <ShoppingCartOutlined /> В корзине
    </Button>
  );
};
