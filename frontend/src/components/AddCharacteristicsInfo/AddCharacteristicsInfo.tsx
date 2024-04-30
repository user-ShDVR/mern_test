import React from "react";

import { Input, Button } from "antd";

import {
  characteristicsDataIndexes,
  characteristicsInitialValues,
  characteristicsPlaceholders,
} from "constants/products-constants";

import styles from "./AddCharacteristicsInfo.module.scss";

interface IAddCharacteristicsInfoProps {
  characteristics: Record<string, string>[];
  setCharacteristics: (characteristics: Record<string, string>[]) => void;
}

export const AddCharacteristicsInfo = (props: IAddCharacteristicsInfoProps) => {
  const { characteristics, setCharacteristics } = props;

  const handleAddCharacteristic = () => {
    setCharacteristics([...characteristics, characteristicsInitialValues]);
  };

  const handleCharacteristicChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedCharacteristics = [...characteristics];
    updatedCharacteristics[index][event.target.name] = event.target.value;
    setCharacteristics(updatedCharacteristics);
  };

  const handleCharacteristicDelete = (index: number) => {
    const updatedCharacteristics = [...characteristics];
    updatedCharacteristics.splice(index, 1);
    setCharacteristics(updatedCharacteristics);
  };

  return (
    <>
      <Button className={styles.addButton} onClick={handleAddCharacteristic}>
        Добавить
      </Button>

      {characteristics?.map((characteristic, index) => (
        <div className={styles.characteristicFields} key={index}>
          <Input
            defaultValue={characteristic.key}
            name={characteristicsDataIndexes.key}
            placeholder={characteristicsPlaceholders.key}
            onChange={(event) => handleCharacteristicChange(index, event)}
          />

          <Input
            defaultValue={characteristic.value}
            name={characteristicsDataIndexes.value}
            placeholder={characteristicsPlaceholders.value}
            onChange={(event) => handleCharacteristicChange(index, event)}
          />

          <Button onClick={() => handleCharacteristicDelete(index)}>
            Удалить
          </Button>
        </div>
      ))}
    </>
  );
};
