import { Form, Input, Select } from "antd";

import {
  DEFAULT_MAX_PRICE_VALUE,
  DEFAULT_MIN_PRICE_VALUE,
  DEFAULT_SELECT_SORT_VALUE,
  filtersDataIndexes,
  filtersLabels,
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
      name: filtersDataIndexes.from,
      label: filtersLabels.from,
      node: <Input value={minValue} defaultValue={DEFAULT_MIN_PRICE_VALUE} />,
    },
    {
      name: filtersDataIndexes.to,
      label: filtersLabels.to,
      node: <Input value={maxValue} defaultValue={DEFAULT_MAX_PRICE_VALUE} />,
    },
    {
      label: filtersLabels.sort,
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
