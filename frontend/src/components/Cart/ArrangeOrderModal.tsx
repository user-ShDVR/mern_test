import { Modal, message } from "antd";

import { ArrangeOrderSteps } from "components/ArrangeOrderSteps/ArrangeOrderSteps";

import { useAddOrderMutation } from "store/api/orders/orders-api";

import { useGetUser } from "hooks/user/use-get-user";

import { IProductsInCart } from "types/IProduct";

interface IArrangeOrderModalProps {
  isOpenArrangeOrderModal: boolean;
  onCloseArrangeOrderModal: () => void;
  products: IProductsInCart[] | undefined;
  cartProductsDataRefetch: () => void;
  productsCount: number | undefined;
  resultPriceCount: number | undefined;
}

export const ArrangeOrderModal = (props: IArrangeOrderModalProps) => {
  const {
    isOpenArrangeOrderModal,
    onCloseArrangeOrderModal,
    products,
    cartProductsDataRefetch,
    productsCount,
    resultPriceCount,
  } = props;

  const { userData } = useGetUser();

  const [addOrder] = useAddOrderMutation();

  const handleAddOrder = () => {
    const orderProducts = products?.map((product) => ({
      productId: product.product_id,
      quantity: product.quantity,
    }));

    const data = {
      user_id: userData?.id,
      quantity: productsCount,
      summary: resultPriceCount,
      products: orderProducts,
    };

    addOrder(data).then((response) => {
      if (response.data) {
        message.success(response.data.message);
      } else {
        message.error("Произошла ошибка при добавлении заказа");
      }
    });

    setTimeout(() => onCloseArrangeOrderModal(), 500);
    cartProductsDataRefetch();
  };

  return (
    <Modal
      open={isOpenArrangeOrderModal}
      onCancel={onCloseArrangeOrderModal}
      footer={null}
      title="Оформление заказа"
    >
      <ArrangeOrderSteps onAddOrder={handleAddOrder} />
    </Modal>
  );
};
