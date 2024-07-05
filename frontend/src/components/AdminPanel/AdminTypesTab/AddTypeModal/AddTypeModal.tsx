import { Modal, Form, Button } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { IAddTypesRequest } from "store/api/types/types";
import { useAddTypesMutation } from "store/api/types/types-api";

import { useGetTypeFields } from "hooks/adminPanel/use-get-type-fields";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";

import { getValidateErrorMessage } from "utils/get-validate-error-message";

import { IType } from "types/IType";

interface IAddTypeModalProps {
  isOpenAddModal: boolean;
  onCloseAddModal: () => void;
}

export const AddTypeModal = (props: IAddTypeModalProps) => {
  const { isOpenAddModal, onCloseAddModal } = props;

  const [
    addType,
    {
      isLoading: isAddTypeLoading,
      isSuccess: isAddTypeSuccess,
      status: addTypeStatus,
      error: addTypeError,
    },
  ] = useAddTypesMutation();

  const { FormItems } = useGetTypeFields({
    typeFields: {} as IType,
    isEdit: false,
  });

  const onFinishAddType = async (formValues: IAddTypesRequest) => {
    await addType(formValues);
    setTimeout(() => onCloseAddModal(), 1000);
  };

  const onFinishFailedAddType = (formValues: ValidateErrorEntity) => {
    getValidateErrorMessage(formValues);
  };

  useGetQueryMessages({
    isLoading: isAddTypeLoading,
    isSuccess: isAddTypeSuccess,
    status: addTypeStatus,
    error: addTypeError,
    successMessage: "Категория успешно добавлена.",
    errorMessage: "Произошла ошибка при добавлении категории.",
  });

  return (
    <Modal
      open={isOpenAddModal}
      onCancel={onCloseAddModal}
      footer={null}
      title="Добавить категорию"
    >
      <Form
        className={styles.editFormAdminTab}
        layout="vertical"
        onFinish={onFinishAddType}
        onFinishFailed={onFinishFailedAddType}
      >
        {FormItems}

        <Button type="primary" htmlType="submit" block>
          Добавить категорию
        </Button>
      </Form>
    </Modal>
  );
};
