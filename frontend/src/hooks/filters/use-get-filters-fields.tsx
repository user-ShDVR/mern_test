import { Form, Input, Select } from "antd";

import {
  DEFAULT_MAX_PRICE_VALUE,
  DEFAULT_MIN_PRICE_VALUE,
  DEFAULT_SELECT_SORT_VALUE,
  productsFiltersDataIndexes,
  productsFiltersLabels,
  sortOptions,
} from "constants/filters-constants";

interface IFiltersFieldsArgs {
  minValue: number;
  maxValue: number;
  handleSort: (value: string) => void;
}

export const useGetFiltersFields = (args: IFiltersFieldsArgs) => {
  const { minValue, maxValue, handleSort } = args;

  const filtersFields = [
    {
      name: productsFiltersDataIndexes.from,
      label: productsFiltersLabels.from,
      node: <Input value={minValue} defaultValue={DEFAULT_MIN_PRICE_VALUE} />,
    },
    {
      name: productsFiltersDataIndexes.to,
      label: productsFiltersLabels.to,
      node: <Input value={maxValue} defaultValue={DEFAULT_MAX_PRICE_VALUE} />,
    },
    {
      label: productsFiltersLabels.sort,
      node: (
        <Select
          defaultValue={DEFAULT_SELECT_SORT_VALUE}
          options={sortOptions}
          onChange={handleSort}
        />
      ),
    },
  ];

  const FormItems = filtersFields.map((field) => (
    <Form.Item key={field.name} {...field}>
      {field.node}
    </Form.Item>
  ));

  return { FormItems };
};
