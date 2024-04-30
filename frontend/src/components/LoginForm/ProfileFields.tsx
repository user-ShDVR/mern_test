import { Form, Input } from "antd";

import {
  DEFAULT_VALIDATE_MESSAGE,
  profileFieldsDataIndexes,
  profileFieldsTitles,
} from "constants/profile-constants";

export const ProfileFields = () => {
  const profileFields = [
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

  return profileFields.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));
};
