import { Form, Input } from "antd";

import {
  accountFieldsDataIndexes,
  accountFieldsTitles,
} from "constants/account-constants";
import { DEFAULT_VALIDATE_MESSAGE } from "constants/general-constants";

export const useGetRegisterFields = () => {
  const registerFields = [
    {
      label: accountFieldsTitles.name,
      name: accountFieldsDataIndexes.name,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} имя`,
        },
      ],
      node: <Input />,
    },
    {
      label: accountFieldsTitles.surname,
      name: accountFieldsDataIndexes.surname,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} фамилия`,
        },
      ],
      node: <Input />,
    },
    {
      label: accountFieldsTitles.lastname,
      name: accountFieldsDataIndexes.lastname,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} отчество`,
        },
      ],
      node: <Input />,
    },
    {
      label: accountFieldsTitles.email,
      name: accountFieldsDataIndexes.email,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} e-mail`,
        },
      ],
      node: <Input />,
    },
    {
      label: accountFieldsTitles.password,
      name: accountFieldsDataIndexes.password,
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
