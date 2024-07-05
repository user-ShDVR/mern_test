import { Modal, Form, Button } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useEditProductsMutation } from "store/api/products/products-api";
import { IEditProductsRequest } from "store/api/products/types";

import { useGetProductFields } from "hooks/adminPanel/use-get-product-fields";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";

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
      isLoading: isEditProductLoading,
      isSuccess: isEditProductSuccess,
      status: editProductStatus,
      error: editProductError,
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
    setTimeout(() => onCloseEditModal(), 1000);
  };

  useGetQueryMessages({
    isLoading: isEditProductLoading,
    isSuccess: isEditProductSuccess,
    status: editProductStatus,
    error: editProductError,
    successMessage: "Продукт успешно обновлен.",
    errorMessage: "Произошла ошибка при обновлении продукта.",
  });

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
