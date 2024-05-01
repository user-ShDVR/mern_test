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
  typesDataRefetch: () => void;
}

export const EditTypesModal = (props: IEditTypesModalProps) => {
  const {
    isOpenEditModal,
    onCloseEditModal,
    certainTypeInModal,
    typesDataRefetch,
  } = props;

  const [editType] = useEditTypesMutation();

  const { FormItems } = useGetAddOrEditTypeFields({
    typeFields: certainTypeInModal,
    isEdit: true,
  });

  const onFinishEditType = (formValues: IEditTypesRequest) => {
    editType({ id: certainTypeInModal.id, ...formValues }).then((response) => {
      if (response.error.originalStatus) {
        message.success(response.error.data);
        setTimeout(() => onCloseEditModal(), 500);
      } else {
        message.error("Произошла ошибка при обновлении категории");
      }
    });

    typesDataRefetch();
  };

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
