import React from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { UploadListType } from "antd/es/upload/interface";

export const UploadButton = () => {

  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const getBase64 = (img: Blob, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJpgOrPng) {
      message.error("Файл должен быть JPG/PNG!");
    }
    if (!isLt2M) {
      message.error("Изображение должно весить меньше 2MB!");
    }

    return isJpgOrPng && isLt2M;
  };
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        message.success(`${info.file.name} загружена успешно`);
      });
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const props = {
    name: "image",
    action: "http://localhost:4444/upload",
    onChange: handleChange,
    beforeUpload: beforeUpload,
    showUploadList: false,
    listType: "picture-card" as UploadListType,
    className: "avatar-uploader",
  };

  return (
    <Upload {...props}>
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: '300px' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
