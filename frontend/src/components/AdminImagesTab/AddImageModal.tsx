import { Modal } from "antd";

import { UploadButton } from "components/UploadButton/UploadButton";

interface IAddImageModalProps {
  isOpenAddModal: boolean;
  onCloseAddModal: () => void;
}

export const AddImageModal = (props: IAddImageModalProps) => {
  const { isOpenAddModal, onCloseAddModal } = props;

  return (
    <Modal
      open={isOpenAddModal}
      footer={null}
      onCancel={onCloseAddModal}
      title="Перетащите или загрузите изображение вручную"
    >
      <UploadButton onCloseAddImageModal={onCloseAddModal} />
    </Modal>
  );
};
