import React from "react";

import { Modal, Form, Button, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useEditProductsMutation } from "store/api/products/products-api";
import { IEditProductsRequest } from "store/api/products/types";

import { useGetProductFields } from "hooks/adminPanel/use-get-product-fields";

import { IProduct } from "types/IProduct";

interface IEditProductModalProps {
  isOpenEditModal: boolean;
  onCloseEditModal: () => void;
  productDataInModal: IProduct;
}

export const EditProductModal = (props: IEditProductModalProps) => {
  const { isOpenEditModal, onCloseEditModal, productDataInModal } = props;

  const [
    editProduct,
    {
      isSuccess: isEditProductSuccess,
      isError: isEditProductError,
      isLoading: isEditProductLoading,
    },
  ] = useEditProductsMutation();

  const { FormItems, characteristics, isEditingInProgress } =
    useGetProductFields({
      productFields: productDataInModal,
      isEdit: true,
      styles,
    });

  const onFinishEditProduct = (formValues: IEditProductsRequest) => {
    const editProductData = {
      ...formValues,
      id: productDataInModal.id,
      ...(formValues.image_id && { image_id: +formValues.image_id }),
      characteristics,
    };

    editProduct(editProductData);
  };

  React.useEffect(() => {
    if (!isEditProductLoading && isEditProductSuccess) {
      message.success("Продукт успешно обновлен");
      setTimeout(() => onCloseEditModal(), 500);
    } else if (!isEditProductLoading && isEditProductError) {
      message.error("Произошла ошибка при обновлении продукта");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditProductSuccess, isEditProductError, isEditProductLoading]);

  return (
    <Modal
      open={isOpenEditModal}
      onCancel={onCloseEditModal}
      footer={null}
      title="Редактировать продукт"
      key={productDataInModal.id}
    >
      <Form
        className={styles.editFormAdminTab}
        layout="vertical"
        onFinish={onFinishEditProduct}
      >
        {FormItems}

        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={isEditingInProgress}
        >
          Редактировать
        </Button>
      </Form>
    </Modal>
  );
};
