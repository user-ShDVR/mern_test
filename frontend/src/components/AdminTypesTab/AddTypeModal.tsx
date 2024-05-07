import { Modal, Form, Button, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { IAddTypesRequest } from "store/api/types/types";
import { useAddTypesMutation } from "store/api/types/types-api";

import { useGetAddOrEditTypeFields } from "hooks/adminPanel/use-get-add-or-edit-type-fields";

import { getValidateErrorMessage } from "utils/get-validate-error-message";

import { IType } from "types/IType";
import { useEffect } from "react";

interface IAddTypeModalProps {
  isOpenAddModal: boolean;
  onCloseAddModal: () => void;
  typesDataRefetch: () => void;
}

export const AddTypeModal = (props: IAddTypeModalProps) => {
  const { isOpenAddModal, onCloseAddModal, typesDataRefetch } = props;

  const [addType, { isSuccess: isAddTypeSuccess, isError: isAddTypeError, isLoading }] = useAddTypesMutation();

  const { FormItems } = useGetAddOrEditTypeFields({
    typeFields: {} as IType,
    isEdit: false,
  });

  const onFinishAddType = async (formValues: IAddTypesRequest) => {
    await addType(formValues);
    typesDataRefetch();
  };

  const onFinishFailedAddType = (formValues: ValidateErrorEntity) => {
    getValidateErrorMessage(formValues);
  };

  useEffect(() => {
    if (!isLoading && isAddTypeSuccess) {
      message.success("Категория успешно добавлена");
      setTimeout(() => onCloseAddModal(), 500);
    } else if (!isLoading && isAddTypeError) {
      message.error("Произошла ошибка валидации при добавлении категории");
    } else {
      setTimeout(() => onCloseAddModal(), 500);
    }
  }, [isAddTypeSuccess, isAddTypeError, isLoading]);

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
