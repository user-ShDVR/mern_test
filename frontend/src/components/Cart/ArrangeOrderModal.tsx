import { Button, Form, Modal, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { useAddOrderMutation } from "store/api/orders/orders-api";

import { useGetArrangeOrderFields } from "hooks/order/use-get-arrange-order-fields";
import { useGetUser } from "hooks/user/use-get-user";

import { getValidateErrorMessage } from "utils/get-validate-error-message";

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
  const { FormItems } = useGetArrangeOrderFields();

  const [addOrder] = useAddOrderMutation();

  const onFinishAddOrder = () => {
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

        <Button type="primary" htmlType="submit">
          Оформить заказ
        </Button>
      </Form>
    </Modal>
  );
};
