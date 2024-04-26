import { Form, Input } from "antd";
import { IUser } from "../../store/api/types";
import {
  profileFieldsDataIndexes,
  profileFieldsTitles,
} from "../../constants/profile-constants";

interface IAccountFieldsProps {
  userData: IUser;
  isEdit: boolean;
}

export const AccountFields = (props: IAccountFieldsProps) => {
  const { userData, isEdit } = props;

  const fieldsData = [
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
