import { Modal, Form, Button, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useAddProductsMutation } from "store/api/products/products-api";

import { IAddProductsRequest } from "store/api/products/types";

import { useGetAddOrEditProductFields } from "hooks/adminPanel/use-get-add-or-edit-product-fields";

import { getValidateErrorMessage } from "utils/get-validate-error-message";

import { IProduct } from "types/IProduct";
import { useEffect } from "react";

interface IAddProductModalProps {
  isOpenAddModal: boolean;
  onCloseAddModal: () => void;
  refetchProductsData: () => void;
}

export const AddProductModal = (props: IAddProductModalProps) => {
  const { isOpenAddModal, onCloseAddModal, refetchProductsData } = props;

  const [addProduct, { isSuccess, isError, isLoading }] = useAddProductsMutation();

  const { FormItems, characteristics } = useGetAddOrEditProductFields({
    productFields: {} as IProduct,
    isEdit: false,
  });

  const onFinishAddProduct = async (formValues: IAddProductsRequest) => {
    formValues.image_id = +formValues.image_id;
    formValues.price = +formValues.price;
    formValues.type_id = +formValues.type_id;

    await addProduct({ ...formValues, characteristics });
    refetchProductsData();
  };

  const onFinishFailedAddProduct = (formValues: ValidateErrorEntity) => {
    getValidateErrorMessage(formValues);
  };
  useEffect(() => {
    if (!isLoading && isSuccess) {
      message.success("Продукт успешно добавлен");
      setTimeout(() => onCloseAddModal(), 500);
    } else if (!isLoading && isError) {
      message.error("Произошла ошибка при добавлении продукта");
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <Modal
      open={isOpenAddModal}
      onCancel={onCloseAddModal}
      footer={null}
      title="Добавить продукт"
    >
      <Form
        className={styles.editForm}
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
