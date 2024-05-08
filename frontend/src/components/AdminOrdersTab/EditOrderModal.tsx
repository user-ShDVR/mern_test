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

  const [editOrder] = useEditOrdersMutation();

  const { FormItems } = useGetEditOrderFields({
    orderFields: certainOrderInModal,
  });

  const onFinishEditOrder = (formValues: IEditOrderRequest) => {
    editOrder({
      id: certainOrderInModal.id,
      status: formValues.status,
    }).then((response) => {
      if (response.data) {
        message.success("Статус заказа успешно обновлен");
        setTimeout(() => onCloseEditModal(), 500);
      } else {
        message.error("Произошла ошибка при обновлении статуса заказа");
      }
    });

    refetchOrdersData();
  };

  return (
    <Modal
      open={isOpenEditModal}
      onCancel={onCloseEditModal}
      footer={null}
      title="Редактировать продукт"
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
