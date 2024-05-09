import React from "react";

import { Form, Input } from "antd";

import { requiredField } from "constants/general-constants";

interface IEditableCellProps {
  isEditingRow: boolean;
  dataIndex: string;
  children: React.ReactNode;
}

export const EditableCell = (props: IEditableCellProps) => {
  const { isEditingRow, dataIndex, children, ...otherProps } = props;

  return (
    <td {...otherProps}>
      {isEditingRow ? (
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: requiredField,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
