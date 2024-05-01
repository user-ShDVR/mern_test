import { Modal, Form, Button, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useEditProductsMutation } from "store/api/products/products-api";
import { IEditProductsRequest } from "store/api/products/types";

import { useGetAddOrEditProductFields } from "hooks/adminPanel/use-get-add-or-edit-product-fields";

import { IProduct } from "types/IProduct";

interface IEditProductModalProps {
  isOpenEditModal: boolean;
  onCloseEditModal: () => void;
  certainProductInModal: IProduct;
  refetchProductsData: () => void;
}

export const EditProductModal = (props: IEditProductModalProps) => {
  const {
    isOpenEditModal,
    onCloseEditModal,
    certainProductInModal,
    refetchProductsData,
  } = props;

  const [editProduct] = useEditProductsMutation();

  const { FormItems, characteristics } = useGetAddOrEditProductFields({
    productFields: certainProductInModal,
    isEdit: true,
  });

  const onFinishEditProduct = (formValues: IEditProductsRequest) => {
    editProduct({
      ...formValues,
      id: certainProductInModal.id,
      characteristics,
    }).then((response) => {
      console.log(response);
      if (response.data) {
        message.success("Продукт успешно обновлен");
        setTimeout(() => onCloseEditModal(), 500);
      } else {
        message.error("Произошла ошибка при обновлении продукта");
      }
    });

    refetchProductsData();
  };

  return (
    <Modal
      open={isOpenEditModal}
      onCancel={onCloseEditModal}
      footer={null}
      title="Редактировать продукт"
      key={certainProductInModal.id}
    >
      <Form
        className={styles.editForm}
        layout="vertical"
        onFinish={onFinishEditProduct}
      >
        {FormItems}

        <Button type="primary" htmlType="submit" block>
          Редактировать
        </Button>
      </Form>
    </Modal>
  );
};
