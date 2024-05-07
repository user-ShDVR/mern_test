import { Form, Input } from "antd";

import { DEFAULT_VALIDATE_MESSAGE } from "constants/general-constants";
import {
  profileFieldsDataIndexes,
  profileFieldsTitles,
} from "constants/profile-constants";

export const useGetRegisterFields = () => {
  const registerFields = [
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
      label: profileFieldsTitles.surname,
      name: profileFieldsDataIndexes.surname,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} фамилия`,
        },
      ],
      node: <Input />,
    },
    {
      label: profileFieldsTitles.lastname,
      name: profileFieldsDataIndexes.lastname,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} отчество`,
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
  ];

  const FormItems = registerFields.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  return { FormItems };
};
