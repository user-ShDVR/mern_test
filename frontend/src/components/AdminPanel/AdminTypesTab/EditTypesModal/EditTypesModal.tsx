import { Modal, Form, Button } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { IEditTypesRequest } from "store/api/types/types";
import { useEditTypesMutation } from "store/api/types/types-api";

import { useGetTypeFields } from "hooks/adminPanel/use-get-type-fields";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";

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
      isLoading: isEditTypeLoading,
      isSuccess: isEditTypeSuccess,
      status: editTypeStatus,
      error: editTypeError,
    },
  ] = useEditTypesMutation();

  const { FormItems } = useGetTypeFields({
    typeFields: typeDataInModal,
    isEdit: true,
  });

  const onFinishEditType = async (formValues: IEditTypesRequest) => {
    await editType({ id: typeDataInModal.id, ...formValues });
    setTimeout(() => onCloseEditModal(), 1000);
  };

  useGetQueryMessages({
    isLoading: isEditTypeLoading,
    isSuccess: isEditTypeSuccess,
    status: editTypeStatus,
    error: editTypeError,
    successMessage: "Категория успешно обновлена.",
    errorMessage: "Произошла ошибка при обновлении категории.",
  });

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
