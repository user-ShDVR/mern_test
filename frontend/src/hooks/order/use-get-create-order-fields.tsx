import { Form, Input, Select } from "antd";

import { DEFAULT_VALIDATE_MESSAGE } from "constants/general-constants";
import {
  citiesOptions,
  addOrderDeliveryDataIndexes,
  addOrderDeliveryLabels,
} from "constants/order-constants";

import { searchedOptions } from "utils/searched-option";

export const useGetCreateOrderFields = () => {
  const deliveryFields = [
    {
      label: addOrderDeliveryLabels.locality,
      name: addOrderDeliveryDataIndexes.locality,
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
      label: addOrderDeliveryLabels.street,
      name: addOrderDeliveryDataIndexes.street,
      node: <Input />,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} улицу`,
        },
      ],
    },
    {
      label: addOrderDeliveryLabels.house,
      name: addOrderDeliveryDataIndexes.house,
      node: <Input />,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} номер дома`,
        },
      ],
    },
    {
      label: addOrderDeliveryLabels.flat,
      name: addOrderDeliveryDataIndexes.flat,
      node: <Input />,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} номер квартиры`,
        },
      ],
    },
    {
      label: addOrderDeliveryLabels.comment,
      name: addOrderDeliveryDataIndexes.comment,
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
