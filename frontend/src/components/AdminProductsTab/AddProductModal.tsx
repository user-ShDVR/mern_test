import { Modal, Form, Button, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useAddProductsMutation } from "store/api/products/products-api";
import { IAddProductsRequest } from "store/api/products/types";

import { useGetAddOrEditProductFields } from "hooks/adminPanel/use-get-add-or-edit-product-fields";

import { IProduct } from "types/IProduct";

interface IAddProductModalProps {
  isOpenAddModal: boolean;
  onCloseAddModal: () => void;
}

export const AddProductModal = (props: IAddProductModalProps) => {
  const { isOpenAddModal, onCloseAddModal } = props;

  const [addProduct, { isSuccess: isAddProductSuccess }] =
    useAddProductsMutation();

  const { FormItems, characteristics } = useGetAddOrEditProductFields({
    productFields: {} as IProduct,
  });

  const onFinishAddProduct = (formValues: IAddProductsRequest) => {
    addProduct({ ...formValues, characteristics });

    if (isAddProductSuccess) {
      message.success("Продукт успешно добавлен");
      setTimeout(() => onCloseAddModal(), 1000);
    } else {
      message.error("Произошла ошибка при добавлении продукта");
      return;
    }
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
      >
        {FormItems}

        <Button type="primary" htmlType="submit" block>
          Добавить продукт
        </Button>
      </Form>
    </Modal>
  );
};
