import { Modal, Form, Button, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { IEditTypesRequest } from "store/api/types/types";
import { useEditTypesMutation } from "store/api/types/types-api";

import { useGetAddOrEditTypeFields } from "hooks/adminPanel/use-get-add-or-edit-type-fields";

import { IType } from "types/IType";
import { useEffect } from "react";

interface IEditTypesModalProps {
  isOpenEditModal: boolean;
  onCloseEditModal: () => void;
  certainTypeInModal: IType;
  typesDataRefetch: () => void;
}

export const EditTypesModal = (props: IEditTypesModalProps) => {
  const {
    isOpenEditModal,
    onCloseEditModal,
    certainTypeInModal,
    typesDataRefetch,
  } = props;

  const [editType, { isSuccess, isError, isLoading}] = useEditTypesMutation();

  const { FormItems } = useGetAddOrEditTypeFields({
    typeFields: certainTypeInModal,
    isEdit: true,
  });

  const onFinishEditType = async (formValues: IEditTypesRequest) => {
    await editType({ id: certainTypeInModal.id, ...formValues });

    typesDataRefetch();
  };
  useEffect(() => {
    if (!isLoading && isSuccess) {
      message.success("Категория успешно обновлена");
      setTimeout(() => onCloseEditModal(), 500);
    } else if (!isLoading && isError) {
      message.error("Произошла ошибка при обновлении категории");
    }
  }, [isSuccess, isError, isLoading]);

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
