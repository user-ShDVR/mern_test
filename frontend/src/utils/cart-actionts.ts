import {
  useAuthControllerGetSesssionInfoQuery,
  useCartsControllerFindOneQuery,
  useCartsProductsControllerCreateMutation,
  useCartsProductsControllerRemoveMutation,
} from "../store/api/defaultApi";
import { message } from "antd";

export enum CartActions {
  ADD = "add",
  DELETE = "delete",
}

interface CartAction {
  productId: number;
  action: CartActions;
  eventButton: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const useCartActions = () => {
  const { data: userData } = useAuthControllerGetSesssionInfoQuery();

  const [addToCart, { isSuccess: isSuccessAddToCart }] =
    useCartsProductsControllerCreateMutation();

  const [deleteFromCart, { isSuccess: isSuccessDeleteFromCart }] =
    useCartsProductsControllerRemoveMutation();

  const handleActionCart = (args: CartAction) => {
    const { productId, action, eventButton } = args;

    eventButton.preventDefault();

    if (action === CartActions.ADD) {
      addToCart({
        createCartsProductDto: {
          cart_id: userData?.id,
          product_id: productId,
          quantity: 1,
        },
      });

      isSuccessAddToCart
        ? message.success("Товар добавлен в корзину")
        : message.error(
            "Произошла ошибка при добавлении в корзину или товар уже есть в корзине"
          );
    }

    if (action === CartActions.DELETE) {
      deleteFromCart({ user_id: userData?.id, product_id: productId });

      isSuccessDeleteFromCart
        ? message.success("Товар удален из корзины")
        : message.error(
            "Произошла ошибка при удалении из корзины или товара уже нет в корзине"
          );
    }
  };

  const { data: cartProductsData } = useCartsControllerFindOneQuery(
    {
      id: userData?.id,
    },
    { skip: !userData }
  );

  return {
    handleActionCart,
    cartProductsData,
  };
};
