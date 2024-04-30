import { Button, Form, InputNumber, Select, Typography } from "antd";

import { useForm } from "antd/es/form/Form";

import {
  DEFAULT_MAX_PRICE_VALUE,
  DEFAULT_MIN_PRICE_VALUE,
} from "constants/products-constants";

import styles from "./CatalogItem.module.scss";

interface FilterSliderProps {
  minValue: number;
  maxValue: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
  setSortOrder: (value: string) => void;
  setSortBy: (value: string) => void;
}

export const Filters = (props: FilterSliderProps) => {
  const {
    minValue,
    maxValue,
    setMinValue,
    setMaxValue,
    setSortOrder,
    setSortBy,
  } = props;

  const [form] = useForm();

  const handleFilter = (values: FilterSliderProps) => {
    setMinValue(values.minValue || DEFAULT_MIN_PRICE_VALUE);
    setMaxValue(values.maxValue || DEFAULT_MAX_PRICE_VALUE);
  };

  const handleReset = () => {
    form.resetFields();
    setMinValue(DEFAULT_MIN_PRICE_VALUE);
    setMaxValue(DEFAULT_MAX_PRICE_VALUE);
  };

  const handleSort = (value: string) => {
    if (value === "name asc") {
      setSortOrder("asc");
      setSortBy("name");
    }

    if (value === "name desc") {
      setSortOrder("desc");
      setSortBy("name");
    }

    if (value === "price asc") {
      setSortOrder("asc");
      setSortBy("price");
    }

    if (value === "price desc") {
      setSortOrder("desc");
      setSortBy("price");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Text>Цена</Typography.Text>
        <Button onClick={handleReset}>Очистить</Button>
      </div>

      <Form onFinish={handleFilter} form={form} layout="vertical">
        <Form.Item name="minValue" label="От">
          <InputNumber
            className={styles.input}
            value={minValue}
            defaultValue={DEFAULT_MIN_PRICE_VALUE}
          />
        </Form.Item>

        <Form.Item name="maxValue" label="До">
          <InputNumber
            className={styles.input}
            value={maxValue}
            defaultValue={DEFAULT_MAX_PRICE_VALUE}
          />
        </Form.Item>

        <Form.Item label="Сортировка">
          <Select
            className={styles.select}
            onChange={handleSort}
            defaultValue="name asc"
          >
            <Select.Option value="name asc">
              По названию (возрастание)
            </Select.Option>

            <Select.Option value="name desc">
              По названию (убывание)
            </Select.Option>

            <Select.Option value="price asc">
              По цене (возрастание)
            </Select.Option>

            <Select.Option value="price desc">По цене (убывание)</Select.Option>
          </Select>
        </Form.Item>

        <Button
          className={styles.confirmButton}
          type="primary"
          htmlType="submit"
        >
          Применить
        </Button>
      </Form>
    </div>
  );
};
