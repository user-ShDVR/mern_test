import { Form, Select } from "antd";

import {
  adminOrderFieldsDataIndexes,
  adminOrderFieldsLabels,
  adminOrderStatusOptions,
} from "constants/order-constants";

import { IOrder } from "types/IOrder";

interface IUseGetEditOrderFieldsArgs {
  orderFields: IOrder;
}

export const useGetEditOrderFields = (args: IUseGetEditOrderFieldsArgs) => {
  const { orderFields } = args;

  const typesFields = [
    {
      name: adminOrderFieldsDataIndexes.status,
      label: adminOrderFieldsLabels.status,
      node: (
        <Select
          defaultValue={orderFields?.status}
          options={adminOrderStatusOptions}
        />
      ),
    },
  ];

  const FormItems = typesFields.map((field) => (
    <Form.Item key={field.name} {...field}>
      {field.node}
    </Form.Item>
  ));

  return { FormItems };
};
