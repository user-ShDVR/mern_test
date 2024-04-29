import { Modal, Form, Button, message } from "antd";
import styles from "../AdminPanel/AdminPanelTab.module.scss";
import { useAddTypesMutation } from "../../store/api/types/types-api";
import { useGetAddOrEditTypeFields } from "../../hooks/adminPanel/use-get-add-or-edit-type-fields";
import { IType } from "../../types/ICatalogElement";
import { IAddTypesRequest } from "../../store/api/types/types";

interface IAddTypeModalProps {
  isOpenAddModal: boolean;
  onCloseAddModal: () => void;
}

export const AddTypeModal = (props: IAddTypeModalProps) => {
  const { isOpenAddModal, onCloseAddModal } = props;

  const [addType] = useAddTypesMutation();

  const formItems = useGetAddOrEditTypeFields({
    typeFields: {} as IType,
    isAddMode: true,
    isEditMode: false,
  });

  const onFinishAddType = (formValues: IAddTypesRequest) => {
    console.log(formValues);
    addType(formValues);

    message.success("Категория успешно добавлена");
    setTimeout(() => onCloseAddModal(), 1000);
  };

  return (
    <Modal
      open={isOpenAddModal}
      onCancel={onCloseAddModal}
      footer={null}
      title="Добавить категорию"
    >
      <Form
        className={styles.editForm}
        layout="vertical"
        onFinish={onFinishAddType}
      >
        {formItems}

        <Button type="primary" htmlType="submit" block>
          Добавить категорию
        </Button>
      </Form>
    </Modal>
  );
};
