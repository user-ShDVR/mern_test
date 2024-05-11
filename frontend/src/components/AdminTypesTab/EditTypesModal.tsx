import React from "react";

import { Modal, Form, Button, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { IEditTypesRequest } from "store/api/types/types";
import { useEditTypesMutation } from "store/api/types/types-api";

import { useGetAddOrEditTypeFields } from "hooks/adminPanel/use-get-add-or-edit-type-fields";

import { IType } from "types/IType";

interface IEditTypesModalProps {
  isOpenEditModal: boolean;
  onCloseEditModal: () => void;
  certainTypeInModal: IType;
  refetchTypesData: () => void;
}

export const EditTypesModal = (props: IEditTypesModalProps) => {
  const {
    isOpenEditModal,
    onCloseEditModal,
    certainTypeInModal,
    refetchTypesData,
  } = props;

  const [
    editType,
    {
      isSuccess: isEditTypeSuccess,
      isError: isEditTypeError,
      isLoading: isEditTypeLoading,
    },
  ] = useEditTypesMutation();

  const { FormItems } = useGetAddOrEditTypeFields({
    typeFields: certainTypeInModal,
    isEdit: true,
  });

  const onFinishEditType = async (formValues: IEditTypesRequest) => {
    await editType({ id: certainTypeInModal.id, ...formValues });
  };

  React.useEffect(() => {
    if (!isEditTypeLoading && isEditTypeSuccess) {
      message.success("Категория успешно обновлена");
      refetchTypesData();

      setTimeout(() => onCloseEditModal(), 500);
    } else if (!isEditTypeLoading && isEditTypeError) {
      message.error("Произошла ошибка при обновлении категории");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditTypeSuccess, isEditTypeError, isEditTypeLoading]);

  return (
    <Modal
      open={isOpenEditModal}
      onCancel={onCloseEditModal}
      footer={null}
      title="Редактировать категорию"
      key={certainTypeInModal.id}
    >
      <Form
        className={styles.editForm}
        layout="vertical"
        onFinish={onFinishEditType}
      >
        {FormItems}

        <Button type="primary" htmlType="submit" block>
          Редактировать
        </Button>
      </Form>
    </Modal>
  );
};
