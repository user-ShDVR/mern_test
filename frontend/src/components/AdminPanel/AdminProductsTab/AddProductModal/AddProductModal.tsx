import React from "react";

import { Modal, Form, Button, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useAddProductsMutation } from "store/api/products/products-api";
import { IAddProductsRequest } from "store/api/products/types";

import { useGetProductFields } from "hooks/adminPanel/use-get-product-fields";

import { getValidateErrorMessage } from "utils/get-validate-error-message";

import { IProduct } from "types/IProduct";

interface IAddProductModalProps {
  isOpenAddModal: boolean;
  onCloseAddModal: () => void;
}

export const AddProductModal = (props: IAddProductModalProps) => {
  const { isOpenAddModal, onCloseAddModal } = props;

  const [
    addProduct,
    {
      isSuccess: isAddProductSuccess,
      isError: isAddProductError,
      isLoading: isAddProductLoading,
    },
  ] = useAddProductsMutation();

  const { FormItems, characteristics } = useGetProductFields({
    productFields: {} as IProduct,
    isEdit: false,
    styles,
  });

  const onFinishAddProduct = async (formValues: IAddProductsRequest) => {
    const addProductData = {
      ...formValues,
      image_id: +formValues.image_id,
      type_id: +formValues.type_id,
      characteristics,
    };

    await addProduct(addProductData);
  };

  const onFinishFailedAddProduct = (formValues: ValidateErrorEntity) => {
    getValidateErrorMessage(formValues);
  };

  React.useEffect(() => {
    if (!isAddProductLoading && isAddProductSuccess) {
      message.success("Продукт успешно добавлен");
      setTimeout(() => onCloseAddModal(), 500);
    } else if (!isAddProductLoading && isAddProductError) {
      message.error("Произошла ошибка при добавлении продукта");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddProductSuccess, isAddProductError, isAddProductLoading]);

  return (
    <Modal
      open={isOpenAddModal}
      onCancel={onCloseAddModal}
      footer={null}
      title="Добавить продукт"
    >
      <Form
        className={styles.editFormAdminTab}
        layout="vertical"
        onFinish={onFinishAddProduct}
        onFinishFailed={onFinishFailedAddProduct}
      >
        {FormItems}

        <Button type="primary" htmlType="submit" block>
          Добавить продукт
        </Button>
      </Form>
    </Modal>
  );
};
