import { Button, Form, Modal, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { useAddOrderMutation } from "store/api/orders/orders-api";

import { useCartActions } from "hooks/cart/use-cart-actions";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";
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

  const [
    addOrder,
    {
      isLoading: isAddOrderLoading,
      isSuccess: isAddOrderSuccess,
      status: addOrderStatus,
      error: addOrderError,
    },
  ] = useAddOrderMutation();

  const onFinishAddOrder = async (formValues: IAdressFields) => {
    if (
      productsCount === undefined ||
      resultPriceCount === undefined ||
      products === undefined
    ) {
      message.error("Недостающие данные для оформления заказа.");
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

    await addOrder(orderData);
    setTimeout(() => onCloseCreateOrderModal(), 1000);
    refetchCartProductsData();
  };

  const onFinishAddOrderFailed = (formValues: ValidateErrorEntity) => {
    getValidateErrorMessage(formValues);
  };

  useGetQueryMessages({
    isLoading: isAddOrderLoading,
    isSuccess: isAddOrderSuccess,
    status: addOrderStatus,
    error: addOrderError,
    successMessage: "Заказ успешно оформлен.",
    errorMessage: "Произошла ошибка при добавлении заказа.",
  });

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
