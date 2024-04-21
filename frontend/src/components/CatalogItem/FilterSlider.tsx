import { Button, Form, InputNumber, Typography } from "antd";
import styles from "./CatalogItem.module.scss";
import { useForm } from "antd/es/form/Form";

interface FilterSliderProps {
  minValue: number;
  maxValue: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
}

export const FilterSlider = (props: FilterSliderProps) => {
  const { minValue, maxValue, setMinValue, setMaxValue } = props;

  const [form] = useForm();

  const defaultMinValue = 1;
  const defaultMaxValue = 10000;

  const handleFilter = (values: FilterSliderProps) => {
    setMinValue(values.minValue || defaultMinValue);
    setMaxValue(values.maxValue || defaultMaxValue);
  };

  const handleReset = () => {
    form.resetFields();
    setMinValue(defaultMinValue);
    setMaxValue(defaultMaxValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Text>Цена</Typography.Text>
        <Button onClick={handleReset}>Очистить</Button>
      </div>

      <Form onFinish={handleFilter} form={form}>
        <Form.Item name="minValue" label="От">
          <InputNumber
            className={styles.rangeInput}
            value={minValue}
            defaultValue={defaultMinValue}
          />
        </Form.Item>

        <Form.Item name="maxValue" label="До">
          <InputNumber
            className={styles.rangeInput}
            value={maxValue}
            defaultValue={defaultMaxValue}
          />
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
