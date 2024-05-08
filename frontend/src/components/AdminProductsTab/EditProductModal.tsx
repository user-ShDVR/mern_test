import React from "react";

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

  const [editProduct, { isSuccess: isProductSuccess, isError, isLoading }] =
    useEditProductsMutation();

  React.useEffect(() => {
    if (!isLoading && isProductSuccess) {
      message.success("Продукт успешно обновлен");
      setTimeout(() => onCloseEditModal(), 500);
    } else if (!isLoading && isError) {
      message.error("Произошла ошибка при обновлении продукта");
    }
  }, [isProductSuccess, isError, isLoading]);

  const { FormItems, characteristics } = useGetAddOrEditProductFields({
    productFields: certainProductInModal,
    isEdit: true,
  });

  const onFinishEditProduct = (formValues: IEditProductsRequest) => {
    const imageId = formValues.image_id ?? null;
    const price = formValues.price ?? null;
    const typeId = formValues.type_id ?? null;

    // Преобразуйте к числу только если значения не null и не undefined
    const formattedFormValues = {
      ...formValues,
      image_id: imageId !== null ? +imageId : undefined,
      price: price !== null ? +price : undefined,
      type_id: typeId !== null ? +typeId : undefined,
      characteristics,
    };

    // Выполнение запроса на редактирование продукта
    editProduct({
      ...formattedFormValues,
      id: certainProductInModal.id,
    });

    // Вызов функции обновления списка продуктов
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
