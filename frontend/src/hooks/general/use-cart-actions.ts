import React from "react";

import { message } from "antd";
import { useSelector } from "react-redux";

import {
  useClearCartsMutation,
  useGetCertainCartsQuery,
} from "store/api/carts/carts-api";
import {
  useAddCartsProductsMutation,
  useDeleteCartsProductsMutation,
  useEditCartsProductsMutation,
} from "store/api/cartsProducts/carts-products-api";
import { selectUser } from "store/features/userSlice";

import { IProductFields } from "types/IProduct";

export enum CartActions {
  ADD = "add",
  DELETE = "delete",
  PLUS = "plus",
  MINUS = "minus",
}

interface CartAction {
  productId: number;
  quantity?: number;
  action: CartActions;
  eventButton?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const useCartActions = () => {
  const { user } = useSelector(selectUser);
  const stringUserId = String(user?.id);
  const numberUserId = Number(user?.id);

  const { data: cartProductsData, refetch: cartProductsDataRefetch } =
    useGetCertainCartsQuery({ id: stringUserId }, { skip: !user });

  const [addToCart] = useAddCartsProductsMutation();
  const [deleteFromCart] = useDeleteCartsProductsMutation();

  const [changeProductQuantity] = useEditCartsProductsMutation();
  const [clearCart] = useClearCartsMutation();

  const getIsProductInCart = (productId: number) =>
    cartProductsData?.carts_products.some(
      (product: IProductFields) => product.product.id === productId
    );

  const handleActionCart = async (args: CartAction) => {
    const { productId, action, eventButton } = args;

    eventButton?.preventDefault();
    if (action === CartActions.ADD) {
      if (!getIsProductInCart(productId)) {
        await addToCart({
          cart_id: numberUserId,
          product_id: productId,
          quantity: 1,
        });

        message.success("Товар добавлен в корзину");
      } else {
        message.error("Товар уже есть в корзине");
      }
    }

    if (action === CartActions.DELETE) {
      if (getIsProductInCart(productId)) {
        await deleteFromCart({
          user_id: numberUserId,
          product_id: productId,
        });

        message.success("Товар удален из корзины");
      } else {
        message.error("Товар не найден в корзине");
      }
    }

    cartProductsDataRefetch();
  };

  const handleChangeProductQuantity = async (args: CartAction) => {
    const { productId, quantity, action } = args;

    if (action === CartActions.PLUS) {
      await changeProductQuantity({
        id: stringUserId,
        product_id: productId,
        quantity: quantity && quantity + 1,
      });
    }

    if (action === CartActions.MINUS) {
      await changeProductQuantity({
        id: stringUserId,
        product_id: productId,
        quantity: quantity && quantity - 1,
      });

      if (quantity && quantity <= 1) {
        message.success("Товар удален из корзины");
      }
    }

    cartProductsDataRefetch();
  };

  const handleClearCart = async () => {
    await clearCart({ id: stringUserId });
    cartProductsDataRefetch();
    message.success("Корзина очищена");
  };

  return {
    cartProductsData,
    handleActionCart,
    getIsProductInCart,
    handleChangeProductQuantity,
    handleClearCart,
  };
};
