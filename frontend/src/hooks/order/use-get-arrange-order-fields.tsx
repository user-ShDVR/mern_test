import { Form, Input, Select } from "antd";

import { DEFAULT_VALIDATE_MESSAGE } from "constants/general-constants";
import {
  citiesOptions,
  deliveryDataIndexes,
  deliveryLabels,
} from "constants/order-constants";

import { searchedOptions } from "utils/searched-option";

export const useGetArrangeOrderFields = () => {
  const deliveryFields = [
    {
      label: deliveryLabels.locality,
      name: deliveryDataIndexes.locality,
      node: (
        <Select
          options={citiesOptions}
          filterOption={searchedOptions}
          showSearch
        />
      ),
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} название населенного пункта`,
        },
      ],
    },
    {
      label: deliveryLabels.street,
      name: deliveryDataIndexes.street,
      node: <Input />,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} улицу`,
        },
      ],
    },
    {
      label: deliveryLabels.house,
      name: deliveryDataIndexes.house,
      node: <Input />,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} номер дома`,
        },
      ],
    },
    {
      label: deliveryLabels.flat,
      name: deliveryDataIndexes.flat,
      node: <Input />,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} номер квартиры`,
        },
      ],
    },
    {
      label: deliveryLabels.comment,
      name: deliveryDataIndexes.comment,
      node: <Input.TextArea rows={4} />,
    },
  ];

  const FormItems = deliveryFields.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  return { FormItems };
};
