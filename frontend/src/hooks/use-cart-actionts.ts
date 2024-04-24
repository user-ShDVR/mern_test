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

  const { data: cartProductsData, refetch: cartProductsDataRefetch } =
    useCartsControllerFindOneQuery(
      {
        id: userData?.id,
      },
      { skip: !userData }
    );

  const [addToCart] = useCartsProductsControllerCreateMutation();
  const [deleteFromCart] = useCartsProductsControllerRemoveMutation();

  const getIsProductInCart = (productId: number) =>
    cartProductsData?.carts_products.some(
      (product) => product.product.id === productId
    );

  const handleActionCart = async (args: CartAction) => {
    const { productId, action, eventButton } = args;

    eventButton.preventDefault();
    if (action === CartActions.ADD) {
      if (!getIsProductInCart(productId)) {
        await addToCart({
          createCartsProductDto: {
            cart_id: userData?.id,
            product_id: productId,
            quantity: 1,
          },
        });

        message.success("Товар добавлен в корзину");
      } else {
        message.error("Товар уже есть в корзине");
      }
    }

    if (action === CartActions.DELETE) {
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

    cartProductsDataRefetch();
  };

  return {
    cartProductsData,
    handleActionCart,
    getIsProductInCart,
  };
};
