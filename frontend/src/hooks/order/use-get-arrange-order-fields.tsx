import { Form, Input, Select } from "antd";

import {
  DEFAULT_VALIDATE_MESSAGE,
  citiesOptions,
  deliveryDataIndexes,
  deliveryLabels,
  monthsOptions,
  paymentDataIndexes,
  paymentLabels,
  stepsLabels,
  yearsOptions,
} from "constants/order-constants";

export const useGetArrangeOrderFields = () => {
  const searchedOptions = (enteredValue: string, option) => {
    return option.label.toLowerCase().includes(enteredValue.toLowerCase());
  };

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
          message: `${DEFAULT_VALIDATE_MESSAGE} квартира`,
        },
      ],
    },
    {
      label: deliveryLabels.comment,
      name: deliveryDataIndexes.comment,
      node: <Input.TextArea rows={4} />,
    },
  ];

  const FieldsDelivery = deliveryFields.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  const paymentFields = [
    {
      label: paymentLabels.cardNumber,
      name: paymentDataIndexes.cardNumber,
      node: <Input />,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} номер карты`,
        },
      ],
    },
    {
      label: paymentLabels.nameAndSurname,
      name: paymentDataIndexes.nameAndSurname,
      node: <Input />,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} имя и фамилию`,
        },
      ],
    },
    {
      label: paymentLabels.month,
      name: paymentDataIndexes.month,
      node: (
        <Select
          options={monthsOptions}
          filterOption={searchedOptions}
          showSearch
        />
      ),
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} месяц`,
        },
      ],
    },
    {
      label: paymentLabels.year,
      name: paymentDataIndexes.year,
      node: (
        <Select
          options={yearsOptions}
          filterOption={searchedOptions}
          showSearch
        />
      ),
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} год`,
        },
      ],
    },
    {
      label: paymentLabels.cvc,
      name: paymentDataIndexes.cvc,
      node: <Input />,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} cvv`,
        },
      ],
    },
  ];

  const FieldsPayment = paymentFields.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  const steps = [
    {
      title: stepsLabels.delivery,
      content: FieldsDelivery,
    },
    {
      title: stepsLabels.payment,
      content: FieldsPayment,
    },
  ];

  return steps;
};
