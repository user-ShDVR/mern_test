import { Modal, Form, Button } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useEditOrdersMutation } from "store/api/orders/orders-api";
import { IEditOrderRequest } from "store/api/orders/types";

import { useGetQueryMessages } from "hooks/general/use-get-query-messages";
import { useGetEditOrderFields } from "hooks/order/use-get-edit-order-field";

import { IOrder } from "types/IOrder";

interface IEditOrderModalProps {
  isOpenEditModal: boolean;
  onCloseEditModal: () => void;
  orderDataInModal: IOrder;
}

export const EditOrderModal = (props: IEditOrderModalProps) => {
  const { isOpenEditModal, onCloseEditModal, orderDataInModal } = props;

  const [
    editOrder,
    {
      isLoading: isEditOrderLoading,
      isSuccess: isEditOrderSuccess,
      status: editOrderStatus,
      error: isEditOrderError,
    },
  ] = useEditOrdersMutation();

  const { FormItems } = useGetEditOrderFields({
    orderFields: orderDataInModal,
  });

  const onFinishEditOrder = (formValues: IEditOrderRequest) => {
    const editOrderData = {
      id: orderDataInModal.id,
      status: formValues.status,
    };

    editOrder(editOrderData);
    setTimeout(() => onCloseEditModal(), 1000);
  };

  useGetQueryMessages({
    isLoading: isEditOrderLoading,
    isSuccess: isEditOrderSuccess,
    status: editOrderStatus,
    error: isEditOrderError,
    successMessage: "Статус заказа успешно обновлен.",
    errorMessage: "Произошла ошибка при обновлении статуса заказа.",
  });

  return (
    <Modal
      open={isOpenEditModal}
      onCancel={onCloseEditModal}
      footer={null}
      title="Редактировать заказ"
      key={orderDataInModal.id}
    >
      <Form
        className={styles.editFormAdminTab}
        layout="vertical"
        onFinish={onFinishEditOrder}
      >
        {FormItems}

        <Button type="primary" htmlType="submit" block>
          Редактировать
        </Button>
      </Form>
    </Modal>
  );
};
