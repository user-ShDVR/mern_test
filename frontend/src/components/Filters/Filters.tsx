import { Button, Form, Typography } from "antd";

import { ShadowCard } from "components/ShadowCard/ShadowCard";

import {
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_PRICE,
} from "constants/filters-constants";

import { useGetFiltersFields } from "hooks/filters/use-get-filters-fields";

import { TObjWithNumberValues } from "types/TObjWithNumberValues";

import styles from "./Filters.module.scss";

interface IFiltersProps {
  minValue: number;
  maxValue: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
  handleFilter: (values: TObjWithNumberValues) => void;
  handleSort: (values: string) => void;
}

export const Filters = (props: IFiltersProps) => {
  const {
    minValue,
    maxValue,
    setMinValue,
    setMaxValue,
    handleFilter,
    handleSort,
  } = props;

  const [form] = Form.useForm();
  const { FormItems } = useGetFiltersFields({ minValue, maxValue, handleSort });

  const handleReset = () => {
    form.resetFields();
    setMinValue(DEFAULT_MIN_PRICE);
    setMaxValue(DEFAULT_MAX_PRICE);
  };

  return (
    <ShadowCard className={styles.filtersWrapper}>
      <div className={styles.filtersHeaderWrapper}>
        <Typography.Title level={4}>Фильтры</Typography.Title>
        <Button onClick={handleReset}>Очистить</Button>
      </div>

      <div className={styles.filtersButtonsWrapper}>
        <Typography.Text>Цена</Typography.Text>

        <Form onFinish={handleFilter} form={form} layout="vertical">
          {FormItems}

          <Button
            className={styles.filtersConfirmButton}
            type="primary"
            htmlType="submit"
          >
            Применить
          </Button>
        </Form>
      </div>
    </ShadowCard>
  );
};
