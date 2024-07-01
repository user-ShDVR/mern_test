import { Button, Form, Modal, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { useAddOrderMutation } from "store/api/orders/orders-api";

import { useCartActions } from "hooks/cart/use-cart-actions";
import { useGetCreateOrderFields } from "hooks/order/use-get-create-order-fields";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { getValidateErrorMessage } from "utils/get-validate-error-message";

import { IAdressFields } from "types/IOrder";
import { IProductsInCart } from "types/IProduct";

interface ICreateOrderModalProps {
  isOpenCreateOrderModal: boolean;
  onCloseCreateOrderModal: () => void;
  products: IProductsInCart[] | undefined;
  productsCount: number | undefined;
  resultPriceCount: number | undefined;
}

export const CreateOrderModal = (props: ICreateOrderModalProps) => {
  const {
    isOpenCreateOrderModal,
    onCloseCreateOrderModal,
    products,
    productsCount,
    resultPriceCount,
  } = props;

  const { authUserData } = useGetAuthUser();

  const { FormItems } = useGetCreateOrderFields();

  const { refetchCartProductsData } = useCartActions();

  const [addOrder, { isLoading: isAddOrderLoading }] = useAddOrderMutation();

  const onFinishAddOrder = async (formValues: IAdressFields) => {
    if (productsCount === undefined || resultPriceCount === undefined || products === undefined) {
      message.error("Ошибка: недостающие данные для оформления заказа");
      return;
    }
    const orderProducts = products?.map((product) => ({
      product_id: product.product_id,
      quantity: product.quantity,
    }));

    const address = `${formValues.locality}, ${formValues.street}, ${formValues.house}, ${formValues.flat}`;

    const orderData = {
      user_id: authUserData?.id,
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

    setTimeout(() => onCloseCreateOrderModal(), 500);
    refetchCartProductsData();
  };

  const onFinishAddOrderFailed = (formValues: ValidateErrorEntity) => {
    getValidateErrorMessage(formValues);
  };

  return (
    <Modal
      open={isOpenCreateOrderModal}
      onCancel={onCloseCreateOrderModal}
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
