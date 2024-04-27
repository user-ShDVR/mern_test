import { Modal, Form, Button } from "antd";
import { useGetEditProductFields } from "../../hooks/adminPanel/use-get-edit-product-fields";
import styles from "../AdminPanel/AdminPanelTab.module.scss";
import { useAddProductsMutation } from "../../store/api/products/products-api";
import { IAddProductsRequest } from "../../store/api/products/types";
import { IProduct } from "../../types/IProduct";

interface IAddProductModalProps {
  isOpenAddModal: boolean;
  onCloseAddModal: () => void;
}

export const AddProductModal = (props: IAddProductModalProps) => {
  const { isOpenAddModal, onCloseAddModal } = props;

  const [addProduct] = useAddProductsMutation();

  const formItems = useGetEditProductFields({} as IProduct);

  const onFinishEditProduct = (formValues: IAddProductsRequest) => {
    console.log(formValues);
    // addProduct(formValues);
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
        onFinish={onFinishEditProduct}
      >
        {formItems}

        <Button type="primary" htmlType="submit" block>
          Добавить продукт
        </Button>
      </Form>
    </Modal>
  );
};
