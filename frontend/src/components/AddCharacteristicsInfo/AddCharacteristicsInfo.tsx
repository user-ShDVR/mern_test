import { Input, Button } from "antd";
import { ChangeEvent } from "react";
import {
  characteristicsDataIndexes,
  characteristicsInitialValues,
} from "../../constants/products-constants";
import styles from "./AddCharacteristicsInfo.module.scss";

interface AddCharacteristicsInfoProps {
  characteristics: Record<string, string>[];
  setCharacteristics: (characteristics: Record<string, string>[]) => void;
}

export const AddCharacteristicsInfo = (props: AddCharacteristicsInfoProps) => {
  const { characteristics, setCharacteristics } = props;

  const handleAddCharacteristic = () => {
    setCharacteristics([...characteristics, characteristicsInitialValues]);
  };

  const handleCharacteristicChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
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

      {characteristics.map((characteristic, index) => (
        <div className={styles.characteristicFields} key={index}>
          <Input
            value={characteristic.key}
            name={characteristicsDataIndexes.key}
            placeholder="Key"
            onChange={(event) => handleCharacteristicChange(index, event)}
          />

          <Input
            value={characteristic.value}
            name={characteristicsDataIndexes.value}
            placeholder="Value"
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
