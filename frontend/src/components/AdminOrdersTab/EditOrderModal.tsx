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
  certainOrderInModal: IOrder;
  refetchOrdersData: () => void;
}

export const EditOrderModal = (props: IEditOrderModalProps) => {
  const {
    isOpenEditModal,
    onCloseEditModal,
    certainOrderInModal,
    refetchOrdersData,
  } = props;

  const [
    editOrder,
    {
      isSuccess: isEditOrderSuccess,
      isError: isEditOrderError,
      isLoading: isEditOrderLoading,
    },
  ] = useEditOrdersMutation();

  const { FormItems } = useGetEditOrderFields({
    orderFields: certainOrderInModal,
  });

  const onFinishEditOrder = (formValues: IEditOrderRequest) => {
    const editOrderData = {
      id: certainOrderInModal.id,
      status: formValues.status,
    };

    editOrder(editOrderData);
  };

  React.useEffect(() => {
    if (!isEditOrderLoading && isEditOrderSuccess) {
      message.success("Статус заказа успешно обновлен");
      refetchOrdersData();

      setTimeout(() => onCloseEditModal(), 500);
    } else if (!isEditOrderLoading && isEditOrderError) {
      message.error("Произошла ошибка при обновлении статуса заказа");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditOrderSuccess, isEditOrderError, isEditOrderLoading]);

  return (
    <Modal
      open={isOpenEditModal}
      onCancel={onCloseEditModal}
      footer={null}
      title="Редактировать заказ"
      key={certainOrderInModal.id}
    >
      <Form
        className={styles.editForm}
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