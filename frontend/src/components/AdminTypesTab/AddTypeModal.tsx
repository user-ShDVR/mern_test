import React from "react";

import { Modal, Form, Button, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { IAddTypesRequest } from "store/api/types/types";
import { useAddTypesMutation } from "store/api/types/types-api";

import { useGetAddOrEditTypeFields } from "hooks/adminPanel/use-get-add-or-edit-type-fields";

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
      isSuccess: isAddTypeSuccess,
      isError: isAddTypeError,
      isLoading: isAddTypeLoading,
    },
  ] = useAddTypesMutation();

  const { FormItems } = useGetAddOrEditTypeFields({
    typeFields: {} as IType,
    isEdit: false,
  });

  const onFinishAddType = async (formValues: IAddTypesRequest) => {
    await addType(formValues);
  };

  const onFinishFailedAddType = (formValues: ValidateErrorEntity) => {
    getValidateErrorMessage(formValues);
  };

  React.useEffect(() => {
    if (!isAddTypeLoading && isAddTypeSuccess) {
      message.success("Категория успешно добавлена");
      setTimeout(() => onCloseAddModal(), 500);
    } else if (!isAddTypeLoading && isAddTypeError) {
      message.error("Произошла ошибка валидации при добавлении категории");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddTypeSuccess, isAddTypeError, isAddTypeLoading]);

  return (
    <Modal
      open={isOpenAddModal}
      onCancel={onCloseAddModal}
      footer={null}
      title="Добавить категорию"
    >
      <Form
        className={styles.entityEditForm}
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
