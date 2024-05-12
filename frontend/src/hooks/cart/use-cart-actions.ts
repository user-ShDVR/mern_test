import { message } from "antd";

import {
  useClearCartsMutation,
  useGetCertainCartsQuery,
} from "store/api/carts/carts-api";
import {
  useAddCartsProductsMutation,
  useDeleteCartsProductsMutation,
  useEditCartsProductsMutation,
} from "store/api/cartsProducts/carts-products-api";

import { useGetUser } from "hooks/user/use-get-user";

import { TButtonEvent } from "types/IProduct";

export enum ECartActions {
  ADD = "add",
  DELETE = "delete",
  PLUS = "plus",
  MINUS = "minus",
}

interface ICartActionArgs {
  productId: number;
  quantity?: number;
  action: ECartActions;
  eventButton?: TButtonEvent;
}

export const useCartActions = () => {
  const { userData } = useGetUser();

  const { data: cartProductsData, refetch: refetchCartProductsData } =
    useGetCertainCartsQuery({ id: userData?.id }, { skip: !userData });

  const [addToCart] = useAddCartsProductsMutation();
  const [deleteFromCart] = useDeleteCartsProductsMutation();

  const [changeProductQuantity] = useEditCartsProductsMutation();
  const [clearCart] = useClearCartsMutation();

  const getIsProductInCart = (productId: number) => {
    return cartProductsData?.carts_products.some(
      (product) => product.product.id === productId
    );
  };

  const handleActionCart = async (args: ICartActionArgs) => {
    const { productId, action, eventButton } = args;

    eventButton?.preventDefault();
    if (action === ECartActions.ADD) {
      if (!getIsProductInCart(productId)) {
        await addToCart({
          cart_id: userData?.id,
          product_id: productId,
          quantity: 1,
        });

        message.success("Товар добавлен в корзину");
      } else {
        message.error("Товар уже есть в корзине");
      }
    }

    if (action === ECartActions.DELETE) {
      if (getIsProductInCart(productId)) {
        await deleteFromCart({
          user_id: userData?.id,
          product_id: productId,
        });

        message.success("Товар удален из корзины");
      } else {
        message.error("Товар не найден в корзине");
      }
    }

    refetchCartProductsData();
  };

  const handleChangeProductQuantity = async (args: ICartActionArgs) => {
    const { productId, quantity, action } = args;

    if (action === ECartActions.PLUS) {
      await changeProductQuantity({
        id: userData?.id,
        product_id: productId,
        quantity: quantity && quantity + 1,
      });
    }

    if (action === ECartActions.MINUS) {
      await changeProductQuantity({
        id: userData?.id,
        product_id: productId,
        quantity: quantity && quantity - 1,
      });

      if (quantity && quantity <= 1) {
        message.success("Товар удален из корзины");
      }
    }

    refetchCartProductsData();
  };

  const handleClearCart = async () => {
    await clearCart({ id: userData?.id });
    refetchCartProductsData();
    message.success("Корзина очищена");
  };

  return {
    cartProductsData,
    refetchCartProductsData,
    handleActionCart,
    getIsProductInCart,
    handleChangeProductQuantity,
    handleClearCart,
  };
};
