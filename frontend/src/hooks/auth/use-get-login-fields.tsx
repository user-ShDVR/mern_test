import { Form, Input } from "antd";

import {
  accountFieldsDataIndexes,
  accountFieldsTitles,
} from "constants/account-constants";
import { DEFAULT_VALIDATE_MESSAGE } from "constants/general-constants";

export const useGetLoginFields = () => {
  const loginFields = [
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

  const FormItems = loginFields.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  return { FormItems };
};
