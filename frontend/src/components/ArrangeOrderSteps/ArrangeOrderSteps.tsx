import React from "react";

import { Button, Form, Steps } from "antd";
import { useSelector } from "react-redux";

import { selectOrder } from "store/features/orderSlice";

import { useActions } from "hooks/general/use-actions";
import { useGetArrangeOrderFields } from "hooks/order/use-get-arrange-order-fields";

import { IArrangeOrderSteps } from "types/IArrangeOrderSteps";

import styles from "./ArrangeOrderSteps.module.scss";

interface IArrangeOrderStepsProps {
  onAddOrder: () => void;
}

export const ArrangeOrderSteps = (props: IArrangeOrderStepsProps) => {
  const { onAddOrder } = props;

  const [currentStep, setCurrentStep] = React.useState(0);

  const orderFields = useSelector(selectOrder);
  const { setArrangeOrderValues } = useActions();

  const steps = useGetArrangeOrderFields();

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSaveStepValues = (formValue: IArrangeOrderSteps) => {
    setArrangeOrderValues(formValue);
  };

  const onFinishArrangeOrder = () => {
    onAddOrder();
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <Steps
        className={styles.stepsWrapper}
        current={currentStep}
        items={items}
      />

      <Form
        layout="vertical"
        onFinish={onFinishArrangeOrder}
        onValuesChange={handleSaveStepValues}
      >
        {steps[currentStep].content}

        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={handleNextStep}>
            Следующий шаг
          </Button>
        )}

        {currentStep === steps.length - 1 && (
          <Button
            className={styles.arrangeOrderButton}
            type="primary"
            htmlType="submit"
          >
            Оформить заказ
          </Button>
        )}

        {currentStep > 0 && (
          <Button onClick={handlePrevStep}>Предыдущий шаг</Button>
        )}
      </Form>
    </>
  );
};
