import { useSelector } from "react-redux";
import { message } from "antd";
import { selectUser } from "../store/features/userSlice";
import {
  useAddCartsProductsMutation,
  useDeleteCartsProductsMutation,
} from "../store/api/cartsProducts/carts-products-api";
import { useGetCertainCartsQuery } from "../store/api/carts/carts-api";

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
  const { user } = useSelector(selectUser);

  const { data: cartProductsData, refetch: cartProductsDataRefetch } =
    useGetCertainCartsQuery(
      {
        id: user?.id,
      },
      { skip: !user }
    );

  const [addToCart] = useAddCartsProductsMutation();
  const [deleteFromCart] = useDeleteCartsProductsMutation();

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
          cart_id: user?.id,
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
          user_id: user?.id,
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
