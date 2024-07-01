import React from "react";

import { Modal, Form, Button, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useEditOrdersMutation } from "store/api/orders/orders-api";
import { IEditOrderRequest } from "store/api/orders/types";

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
      isSuccess: isEditOrderSuccess,
      isError: isEditOrderError,
      isLoading: isEditOrderLoading,
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
  };

  React.useEffect(() => {
    if (!isEditOrderLoading && isEditOrderSuccess) {
      message.success("Статус заказа успешно обновлен");
      setTimeout(() => onCloseEditModal(), 500);
    } else if (!isEditOrderLoading && isEditOrderError) {
      message.error("Произошла ошибка при обновлении статуса заказа");
    }
  }, [isEditOrderSuccess, isEditOrderError, isEditOrderLoading]);

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
