import React from "react";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";

import { UploadListType, UploadProps } from "antd/es/upload/interface";

import { useGetImagesQuery } from "store/api/images/images-api";

import styles from "./UploadButton.module.scss";

interface IUploadButtonProps {
  onCloseAddImageModal: () => void;
}

export const UploadButton = (props: IUploadButtonProps) => {
  const { onCloseAddImageModal } = props;

  const { refetch: refetchImagesData } = useGetImagesQuery();

  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const getBase64 = (img: Blob, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPngImageFormat =
      file.type === "image/jpeg" || file.type === "image/png";

    const isTwoMBImageWeight = file.size / 1024 / 1024 < 2;

    if (!isJpgOrPngImageFormat) {
      message.error("Файл должен быть JPG/PNG!");
    }

    if (!isTwoMBImageWeight) {
      message.error("Изображение должно весить меньше 2MB!");
    }

    return isJpgOrPngImageFormat && isTwoMBImageWeight;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done" && info.file.originFileObj) {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);

        message.success(`Изображение ${info.file.name} загружено успешно`);
        refetchImagesData();
        setTimeout(() => onCloseAddImageModal(), 500);
      });
    }
  };

  const uploadButton = (
    <span>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <p>Загрузить изображение</p>
    </span>
  );

  const uploadProps = {
    name: "file",
    action: `${import.meta.env.VITE_BASE_URL}/images`,
    onChange: handleChange,
    beforeUpload: beforeUpload,
    listType: "picture-card" as UploadListType,
    showUploadList: false,
    withCredentials: true,
  };

  return (
    <Upload {...uploadProps}>
      {imageUrl ? (
        <img className={styles.uploadedImage} src={imageUrl} alt="" />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
