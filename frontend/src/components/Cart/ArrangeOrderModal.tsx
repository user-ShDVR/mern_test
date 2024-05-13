import { Button, Form, Modal, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { useAddOrderMutation } from "store/api/orders/orders-api";

import { useCartActions } from "hooks/cart/use-cart-actions";
import { useGetArrangeOrderFields } from "hooks/order/use-get-arrange-order-fields";
import { useGetUser } from "hooks/user/use-get-user";

import { getValidateErrorMessage } from "utils/get-validate-error-message";

import { IAdressFields } from "types/IOrder";
import { IProductsInCart } from "types/IProduct";

interface IArrangeOrderModalProps {
  isOpenArrangeOrderModal: boolean;
  onCloseArrangeOrderModal: () => void;
  products: IProductsInCart[] | undefined;
  productsCount: number | undefined;
  resultPriceCount: number | undefined;
}

export const ArrangeOrderModal = (props: IArrangeOrderModalProps) => {
  const {
    isOpenArrangeOrderModal,
    onCloseArrangeOrderModal,
    products,
    productsCount,
    resultPriceCount,
  } = props;

  const { userData } = useGetUser();

  const { FormItems } = useGetArrangeOrderFields();

  const { refetchCartProductsData } = useCartActions();

  const [addOrder, { isLoading: isAddOrderLoading }] = useAddOrderMutation();

  const onFinishAddOrder = async (formValues: IAdressFields) => {
    const orderProducts = products?.map((product) => ({
      productId: product.product_id,
      quantity: product.quantity,
    }));

    const address = `${formValues.locality}, ${formValues.street}, ${formValues.house}, ${formValues.flat}`;

    const orderData = {
      user_id: userData?.id,
      quantity: productsCount,
      summary: resultPriceCount,
      products: orderProducts,
      address,
    };

    try {
      const response = await addOrder(orderData);
      if ("data" in response && response.data) {
        message.success("Заказ успешно оформлен");
      } else if ("error" in response) {
        if ("status" in response.error) {
          message.error(
            "Произошла ошибка при добавлении заказа: " + response.error.status
          );
        } else if ("message" in response.error) {
          message.error("Произошла ошибка: " + response.error.message);
        } else {
          message.error("Произошла неизвестная ошибка при добавлении заказа");
        }
      }
    } catch (error) {
      console.error(error);
      message.error("Произошла ошибка при обработке запроса");
    }

    setTimeout(() => onCloseArrangeOrderModal(), 500);
    refetchCartProductsData();
  };

  const onFinishAddOrderFailed = (formValues: ValidateErrorEntity) => {
    getValidateErrorMessage(formValues);
  };

  return (
    <Modal
      open={isOpenArrangeOrderModal}
      onCancel={onCloseArrangeOrderModal}
      footer={null}
      title="Оформление заказа"
    >
      <Form
        layout="vertical"
        onFinish={onFinishAddOrder}
        onFinishFailed={onFinishAddOrderFailed}
      >
        {FormItems}

        <Button
          type="primary"
          htmlType="submit"
          loading={isAddOrderLoading}
          disabled={isAddOrderLoading}
        >
          Оформить заказ
        </Button>
      </Form>
    </Modal>
  );
};
