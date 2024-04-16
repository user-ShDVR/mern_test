import React, { useState } from "react";
import { Form, Input, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  profileFieldsDataIndexes,
  profileFieldsTitles,
} from "../../constants/constants";
import { IUser } from "../../store/api/types";

export const AccountFields: React.FC<{ userData: IUser | undefined, isEdit: boolean }> = ({ userData, isEdit }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(userData?.avatarUrl || null);

  const getBase64 = (img: Blob, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result as string);
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      message.error("Файл должен быть JPG/PNG!");
      return false;
    }
    if (!isLt2M) {
      message.error("Изображение должно весить меньше 2MB!");
      return false;
    }
    return true;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done" && info.file.originFileObj) {
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false);
        setImageUrl(imageUrl);
        message.success(`${info.file.name} загружена успешно`);
      });
    } else if (info.file.status === "error") {
      setLoading(false);
      message.error('Загрузка не удалась');
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const fieldsData = [
    {
      label: profileFieldsTitles.avatarUrl,
      name: profileFieldsDataIndexes.avatarUrl,
      node: isEdit ? (
        <Upload
          name="image"
          style={{ width: '100%' }}
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          action="http://localhost:4444/upload"
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '300px' }} /> : uploadButton}
        </Upload>
      ) : (
        <img src={imageUrl || "https://static8.depositphotos.com/1009634/988/v/450/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg"} alt="Avatar" style={{ width: 400 }} />
      ),
    },
    {
      label: profileFieldsTitles.name,
      name: profileFieldsDataIndexes.name,
      node: <Input disabled={!isEdit} />,
    },
    {
      label: profileFieldsTitles.password,
      name: profileFieldsDataIndexes.password,
      node: <Input.Password disabled={!isEdit} />,
    },
  ];

  return (
    <>
      {fieldsData.map((field) => (
        <Form.Item
          label={field.label}
          name={field.name}
          key={field.name}
          initialValue={userData ? userData[field.name as keyof IUser] : ""}
        >
          {field.node}
        </Form.Item>
      ))}
    </>
  );
};

