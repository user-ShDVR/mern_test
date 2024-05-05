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
  const { user } = useSelector(selectUser);

  const stringUserId = String(user?.id);
  const numberUserId = Number(user?.id);

  const { data: cartProductsData, refetch: cartProductsDataRefetch } =
    useGetCertainCartsQuery({ id: stringUserId }, { skip: !user });

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
          cart_id: numberUserId,
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

  const handleChangeProductQuantity = async (args: ICartActionArgs) => {
    const { productId, quantity, action } = args;

    if (action === ECartActions.PLUS) {
      await changeProductQuantity({
        id: stringUserId,
        product_id: productId,
        quantity: quantity && quantity + 1,
      });
    }

    if (action === ECartActions.MINUS) {
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
    cartProductsDataRefetch,
    handleActionCart,
    getIsProductInCart,
    handleChangeProductQuantity,
    handleClearCart,
  };
};
