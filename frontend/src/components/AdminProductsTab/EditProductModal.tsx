import { Modal, Form, Button } from "antd";
import { IProduct } from "../../types/IProduct";
import { useGetAddOrEditProductFields } from "../../hooks/adminPanel/use-get-add-or-edit-product-fields";
import styles from "../AdminPanel/AdminPanelTab.module.scss";
import { useEditProductsMutation } from "../../store/api/products/products-api";
import { IEditProductsRequest } from "../../store/api/products/types";

interface IEditProductModalProps {
  isOpenEditModal: boolean;
  onCloseEditModal: () => void;
  certainProductInModal: IProduct;
}

export const EditProductModal = (props: IEditProductModalProps) => {
  const { isOpenEditModal, onCloseEditModal, certainProductInModal } = props;

  const [editProduct] = useEditProductsMutation();

  const formItems = useGetAddOrEditProductFields(certainProductInModal);

  const onFinishEditProduct = (formValues: IEditProductsRequest) => {
    editProduct({ id: certainProductInModal.id, ...formValues });
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
        {formItems}

        <Button type="primary" htmlType="submit" block>
          Редактировать
        </Button>
      </Form>
    </Modal>
  );
};
