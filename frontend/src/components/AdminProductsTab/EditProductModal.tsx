import { Modal, Form, Button } from "antd";
import { IProduct } from "../../types/IProduct";
import { useGetEditProductFields } from "../../hooks/use-get-edit-product-fields";
import styles from "./AdminProductsTab.module.scss";
import { useEditProductsMutation } from "../../store/api/products/products-api";
import { IEditProductsRequest } from "../../store/api/products/types";

interface IEditProductModalProps {
  isOpenEditModal: boolean;
  onCloseEditModal: () => void;
  certainProductInModal: IProduct;
}

export const EditProductModal = (props: IEditProductModalProps) => {
  const { isOpenEditModal, onCloseEditModal, certainProductInModal } = props;

  const [editProduct] = useEditProductsMutation({
    id: certainProductInModal.id,
  });

  const formItems = useGetEditProductFields(certainProductInModal);

  const onFinishEditProduct = (formValues: IEditProductsRequest) => {
    console.log(formValues);
    // editProduct(formValues);
  };

  return (
    <Modal
      open={isOpenEditModal}
      onCancel={onCloseEditModal}
      footer={null}
      title="Редактировать продукт"
      // если нужно, чтобы defaulValue в инпутах менялся
      // при открытии модалки редактиврония конкретного продукта
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
