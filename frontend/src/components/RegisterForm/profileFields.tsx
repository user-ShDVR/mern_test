import { DatePicker, Form, Input, Select } from "antd";
import {
  DEFAULT_VALIDATE_MESSAGE,
  genderOptions,
  profileFieldsDataIndexes,
  profileFieldsTitles,
} from "../../constants/constants";
import { UploadButton } from "../UploadButton/UploadButton";

export const ProfileFields = () => {
  const profileFields = [
    {
      label: profileFieldsTitles.name,
      name: profileFieldsDataIndexes.name,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} имя`,
        },
      ],
      node: <Input />,
    },
    {
      label: profileFieldsTitles.email,
      name: profileFieldsDataIndexes.email,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} e-mail`,
        },
      ],
      node: <Input />,
    },
    {
      label: profileFieldsTitles.password,
      name: profileFieldsDataIndexes.password,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} пароль`,
        },
      ],
      node: <Input />,
    },
    {
      label: profileFieldsTitles.birth_date,
      name: profileFieldsDataIndexes.birth_date,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} дату рождения`,
        },
      ],
      node: <DatePicker />,
    },
    {
      label: profileFieldsTitles.gender,
      name: profileFieldsDataIndexes.gender,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} пол`,
        },
      ],
      node: <Select placeholder="Выберите пол" options={genderOptions} />,
    },
    {
      label: profileFieldsTitles.avatarUrl,
      name: profileFieldsDataIndexes.avatarUrl,
      node: UploadButton(),
    },
  ];

  return profileFields.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));
};
