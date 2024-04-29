import { Modal, Form, Button, message } from "antd";
import { useGetAddOrEditTypeFields } from "../../hooks/adminPanel/use-get-add-or-edit-type-fields";
import styles from "../AdminPanel/AdminPanelTab.module.scss";
import { useEditTypesMutation } from "../../store/api/types/types-api";
import { IEditTypesRequest } from "../../store/api/types/types";
import { IType } from "../../types/ICatalogElement";

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

  const formItems = useGetAddOrEditTypeFields({
    typeFields: certainTypeInModal,
    isAddMode: true,
    isEditMode: false,
  });

  const onFinishEditType = (formValues: IEditTypesRequest) => {
    editType({ id: certainTypeInModal.id, ...formValues });
    typesDataRefetch();

    message.success("Категория успешно обновлена");
    setTimeout(() => onCloseEditModal(), 1000);
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
        {formItems}

        <Button type="primary" htmlType="submit" block>
          Редактировать
        </Button>
      </Form>
    </Modal>
  );
};
