import React from "react";

import { Modal, Form, Button, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { IEditTypesRequest } from "store/api/types/types";
import { useEditTypesMutation } from "store/api/types/types-api";

import { useGetTypeFields } from "hooks/adminPanel/use-get-type-fields";

import { IType } from "types/IType";

interface IEditTypesModalProps {
  isOpenEditModal: boolean;
  onCloseEditModal: () => void;
  typeDataInModal: IType;
}

export const EditTypesModal = (props: IEditTypesModalProps) => {
  const { isOpenEditModal, onCloseEditModal, typeDataInModal } = props;

  const [
    editType,
    {
      isSuccess: isEditTypeSuccess,
      isError: isEditTypeError,
      isLoading: isEditTypeLoading,
    },
  ] = useEditTypesMutation();

  const { FormItems } = useGetTypeFields({
    typeFields: typeDataInModal,
    isEdit: true,
  });

  const onFinishEditType = async (formValues: IEditTypesRequest) => {
    await editType({ id: typeDataInModal.id, ...formValues });
  };

  React.useEffect(() => {
    if (!isEditTypeLoading && isEditTypeSuccess) {
      message.success("Категория успешно обновлена");
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
      key={typeDataInModal.id}
    >
      <Form
        className={styles.editFormAdminTab}
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
