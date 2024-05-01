import { Modal, Form, Button, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { IAddTypesRequest } from "store/api/types/types";
import { useAddTypesMutation } from "store/api/types/types-api";

import { useGetAddOrEditTypeFields } from "hooks/adminPanel/use-get-add-or-edit-type-fields";

import { IType } from "types/IType";

interface IAddTypeModalProps {
  isOpenAddModal: boolean;
  onCloseAddModal: () => void;
}

export const AddTypeModal = (props: IAddTypeModalProps) => {
  const { isOpenAddModal, onCloseAddModal } = props;

  const [addType] = useAddTypesMutation();

  const { FormItems } = useGetAddOrEditTypeFields({
    typeFields: {} as IType,
    isEdit: false,
  });

  const onFinishAddType = (formValues: IAddTypesRequest) => {
    addType(formValues).then((response) => {
      console.log(response);
      if (response.error.originalStatus) {
        message.success(response.error.data);
        setTimeout(() => onCloseAddModal(), 500);
      } else {
        message.error("Произошла ошибка валидации при добавлении категории");
      }
    });
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
        {FormItems}

        <Button type="primary" htmlType="submit" block>
          Добавить категорию
        </Button>
      </Form>
    </Modal>
  );
};
