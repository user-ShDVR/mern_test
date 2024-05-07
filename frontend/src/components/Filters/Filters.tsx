import { Button, Form, Typography } from "antd";

import { ShadowCard } from "components/ShadowCard/ShadowCard";

import {
  DEFAULT_MAX_PRICE_VALUE,
  DEFAULT_MIN_PRICE_VALUE,
} from "constants/filters-constants";

import { useGetFiltersFields } from "hooks/filters/use-get-filters-fields";

import styles from "./Filters.module.scss";

interface IFiltersProps {
  minValue: number;
  maxValue: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
  handleFilter: (values: Record<string, number>) => void;
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

  const { FormItems } = useGetFiltersFields({ minValue, maxValue, handleSort });

  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    setMinValue(DEFAULT_MIN_PRICE_VALUE);
    setMaxValue(DEFAULT_MAX_PRICE_VALUE);
  };

  return (
    <ShadowCard className={styles.filtersWrapper}>
      <Typography.Title level={4}>Фильтры</Typography.Title>

      <div className={styles.container}>
        <div className={styles.header}>
          <Typography.Text>Цена</Typography.Text>
          <Button onClick={handleReset}>Очистить</Button>
        </div>

        <Form onFinish={handleFilter} form={form} layout="vertical">
          {FormItems}

          <Button
            className={styles.confirmButton}
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