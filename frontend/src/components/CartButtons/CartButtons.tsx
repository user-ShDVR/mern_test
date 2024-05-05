import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

import { ECartActions, useCartActions } from "hooks/cart/use-cart-actions";

import { TButtonEvent } from "types/IProduct";

interface ICartButtonsProps {
  productId: number;
}

export const CartButtons = (props: ICartButtonsProps) => {
  const { productId } = props;

  const { handleActionCart, getIsProductInCart } = useCartActions();

  const handleAddToCart = (event: TButtonEvent) => {
    handleActionCart({
      productId: productId,
      action: ECartActions.ADD,
      eventButton: event,
    });
  };

  const handleDeleteFromCart = (event: TButtonEvent) => {
    handleActionCart({
      productId: productId,
      action: ECartActions.DELETE,
      eventButton: event,
    });
  };

  return !getIsProductInCart(productId) ? (
    <Button
      type="primary"
      onClick={(event) => handleAddToCart(event as unknown as TButtonEvent)}
      block
    >
      <ArrowDownOutlined />
      <ShoppingCartOutlined /> В корзину
    </Button>
  ) : (
    <Button
      onClick={(event) =>
        handleDeleteFromCart(event as unknown as TButtonEvent)
      }
      block
    >
      <ArrowUpOutlined />
      <ShoppingCartOutlined /> В корзине
    </Button>
  );
};
