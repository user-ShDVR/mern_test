import React from "react";

import { Button, Form, Table, Typography } from "antd";

import { tableRowWidths } from "constants/general-constants";
import {
  adminProductCharacteristicsDataIndexes,
  emptyCharacteristicsText,
} from "constants/products-constants";

import { generateUniqueId } from "utils/generateQniqueId";

import { ICharacteristicsInfoRow } from "types/ICharacteristicsInfoRow";

import styles from "./AddCharacteristicsInfo.module.scss";
import { EditableCell } from "./EditableCell";

interface IAddCharacteristicsInfoProps {
  characteristics: ICharacteristicsInfoRow[];
  setCharacteristics: (characteristics: ICharacteristicsInfoRow[]) => void;
}

export const AddCharacteristicsInfo = (props: IAddCharacteristicsInfoProps) => {
  const { characteristics, setCharacteristics } = props;

  const [recordsData, setRecordsData] = React.useState(characteristics);
  const [editingRowKey, setEditingRowKey] = React.useState("");

  const [form] = Form.useForm();

  const isEditing = (record: ICharacteristicsInfoRow) => {
    return record.rowKey === editingRowKey;
  };

  React.useEffect(() => {
    setCharacteristics(recordsData);
  }, [recordsData, setCharacteristics]);

  const handleEditRow = (record: ICharacteristicsInfoRow) => {
    const newData = {
      [adminProductCharacteristicsDataIndexes.key]: "",
      [adminProductCharacteristicsDataIndexes.value]: "",
      ...record,
    };

    form.setFieldsValue(newData);
    setEditingRowKey(record.rowKey ?? "");
  };

  const handleCancelChanges = () => {
    setEditingRowKey("");

    const rowFields = form.getFieldsValue();
    const isEmptyRowFields = Object.values(rowFields).every(
      (value) => value === ""
    );

    if (isEmptyRowFields) {
      const deleteCurrenRowAfterCancel = recordsData.filter((item) => {
        return item.rowKey !== editingRowKey;
      });

      setRecordsData(deleteCurrenRowAfterCancel);
    }
  };

  const handleSaveChanges = async (rowKey: string) => {
    try {
      const row = await form.validateFields();

      const newRowData = [...recordsData];
      const currentRowIndex = newRowData.findIndex(
        (item) => rowKey === item.rowKey
      );

      if (currentRowIndex > -1) {
        const rowItem = newRowData[currentRowIndex];

        newRowData.splice(currentRowIndex, 1, {
          ...rowItem,
          ...row,
        });

        setRecordsData(newRowData);
        setEditingRowKey("");
      } else {
        newRowData.push(row);

        setRecordsData(newRowData);
        setEditingRowKey("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewRow = () => {
    const newRowKey = generateUniqueId();

    const newRow = {
      rowKey: newRowKey,
      [adminProductCharacteristicsDataIndexes.key]: "",
      [adminProductCharacteristicsDataIndexes.value]: "",
    };

    form.setFieldsValue({
      [adminProductCharacteristicsDataIndexes.key]: "",
      [adminProductCharacteristicsDataIndexes.value]: "",
    });

    const recordsDataWithNewRow = [...recordsData, newRow];

    setRecordsData(recordsDataWithNewRow);
    setEditingRowKey(newRowKey);
  };

  const columns = [
    {
      dataIndex: adminProductCharacteristicsDataIndexes.key,
      editable: true,
      width: tableRowWidths.width_30,
    },
    {
      dataIndex: adminProductCharacteristicsDataIndexes.value,
      editable: true,
      width: tableRowWidths.width_30,
    },
    {
      render: (_: unknown, record: ICharacteristicsInfoRow) => {
        const isRowEditable = isEditing(record);
        return isRowEditable ? (
          <>
            <Typography.Link
              onClick={() => handleSaveChanges(record.rowKey ?? "")}
            >
              Сохранить
            </Typography.Link>{" "}
            <Typography.Link onClick={handleCancelChanges}>
              Отменить
            </Typography.Link>
          </>
        ) : (
          <Typography.Link
            onClick={() => handleEditRow(record)}
            disabled={editingRowKey !== ""}
          >
            Редактировать
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: ICharacteristicsInfoRow) => ({
        isEditingRow: isEditing(record),
        dataIndex: col.dataIndex,
        record,
        title: "",
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Button
        className={styles.addButton}
        onClick={handleAddNewRow}
        disabled={editingRowKey !== ""}
        type="primary"
      >
        Добавить характеристику товара
      </Button>

      <Table
        components={{ body: { cell: EditableCell } }}
        bordered
        dataSource={recordsData}
        columns={mergedColumns}
        pagination={false}
        showHeader={false}
        locale={{ emptyText: emptyCharacteristicsText }}
      />
    </Form>
  );
};
