import { Modal, Form, Button, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { IAddTypesRequest } from "store/api/types/types";
import { useAddTypesMutation } from "store/api/types/types-api";

import { useGetAddOrEditTypeFields } from "hooks/adminPanel/use-get-add-or-edit-type-fields";

import { IType } from "types/ICatalogElement";

interface IAddTypeModalProps {
  isOpenAddModal: boolean;
  onCloseAddModal: () => void;
}

export const AddTypeModal = (props: IAddTypeModalProps) => {
  const { isOpenAddModal, onCloseAddModal } = props;

  const [addType, { isSuccess: isAddTypeSuccess }] = useAddTypesMutation();

  const { FormItems } = useGetAddOrEditTypeFields({ typeFields: {} as IType });

  const onFinishAddType = (formValues: IAddTypesRequest) => {
    console.log(formValues);
    addType(formValues);

    if (isAddTypeSuccess) {
      message.success("Категория успешно добавлена");
      setTimeout(() => onCloseAddModal(), 1000);
    } else {
      message.error("Произошла ошибка при добавлении категории");
      return;
    }
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
