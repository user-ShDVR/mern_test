import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";

import { ECartActions, useCartActions } from "hooks/cart/use-cart-actions";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { TButtonEvent } from "types/IProduct";

interface ICartButtonsProps {
  productId: number;
}

export const CartButtons = (props: ICartButtonsProps) => {
  const { productId } = props;

  const { authUserData } = useGetAuthUser();

  const { handleActionCart, getIsProductInCart } = useCartActions();

  const handleAddToCart = (event: TButtonEvent) => {
    handleActionCart({
      productId,
      action: ECartActions.ADD,
      eventButton: event,
    });
  };

  const handleDeleteFromCart = (event: TButtonEvent) => {
    handleActionCart({
      productId,
      action: ECartActions.DELETE,
      eventButton: event,
    });
  };

  return !getIsProductInCart(productId) ? (
    <Tooltip
      title={
        !authUserData
          ? "Добавлять товары в корзину может только авторизованный пользователь"
          : ""
      }
    >
      <Button
        type="primary"
        onClick={(event) => handleAddToCart(event as unknown as TButtonEvent)}
        disabled={!authUserData}
        block
      >
        <ArrowDownOutlined />
        <ShoppingCartOutlined /> В корзину
      </Button>
    </Tooltip>
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
