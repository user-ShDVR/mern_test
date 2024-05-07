import { Modal, Form, Button, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useAddProductsMutation } from "store/api/products/products-api";
import { IAddProductsRequest } from "store/api/products/types";

import { useGetAddOrEditProductFields } from "hooks/adminPanel/use-get-add-or-edit-product-fields";

import { getValidateErrorMessage } from "utils/get-validate-error-message";

import { IProduct } from "types/IProduct";

interface IAddProductModalProps {
  isOpenAddModal: boolean;
  onCloseAddModal: () => void;
  refetchProductsData: () => void;
}

export const AddProductModal = (props: IAddProductModalProps) => {
  const { isOpenAddModal, onCloseAddModal, refetchProductsData } = props;

  const [addProduct] = useAddProductsMutation();

  const { FormItems, characteristics } = useGetAddOrEditProductFields({
    productFields: {} as IProduct,
    isEdit: false,
  });

  const onFinishAddProduct = (formValues: IAddProductsRequest) => {
    addProduct({ ...formValues, characteristics }).then((response) => {
      if (response.data) {
        message.success("Продукт успешно добавлен");
        setTimeout(() => onCloseAddModal(), 500);
      } else {
        message.error("Произошла ошибка при добавлении продукта");
      }
    });

    refetchProductsData();
  };

  const onFinishFailedAddProduct = (formValues: ValidateErrorEntity) => {
    getValidateErrorMessage(formValues);
  };

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
