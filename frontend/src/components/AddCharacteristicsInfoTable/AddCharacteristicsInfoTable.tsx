import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Table, Tooltip, Typography } from "antd";

import { tableRowWidths } from "constants/general-constants";
import {
  adminProductCharacteristicsDataIndexes,
  EMPTY_CHARACTERISTICS_TEXT,
} from "constants/products-constants";

import { generateUniqueId } from "utils/generate-unique-Id";

import { IProductCharacteristics } from "types/IProduct";

import styles from "./AddCharacteristicsInfoTable.module.scss";
import { EditableCell } from "./EditableCell/EditableCell";

interface IAddCharacteristicsInfoTableProps {
  characteristics: IProductCharacteristics[];
  setCharacteristics: (characteristics: IProductCharacteristics[]) => void;
  editingRowKey: string;
  setEditingRowKey: (rowKey: string) => void;
  isEditingInProgress: boolean;
}

export const AddCharacteristicsInfoTable = (
  props: IAddCharacteristicsInfoTableProps
) => {
  const {
    characteristics,
    setCharacteristics,
    editingRowKey,
    setEditingRowKey,
    isEditingInProgress,
  } = props;

  const [recordsData, setRecordsData] = React.useState(characteristics);

  const [form] = Form.useForm();

  const isEditing = (record: IProductCharacteristics) => {
    return record.rowKey === editingRowKey;
  };

  React.useEffect(() => {
    setCharacteristics(recordsData);
  }, [recordsData, setCharacteristics]);

  const handleEditRow = (record: IProductCharacteristics) => {
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
      render: (_: unknown, record: IProductCharacteristics) => {
        const isRowEditable = isEditing(record);
        return isRowEditable ? (
          <>
            <Typography.Link
              onClick={() => handleSaveChanges(record.rowKey ?? "")}
            >
              Сохранить
            </Typography.Link>

            <Typography.Text
              className={styles.addCharacteristicsInfoTableDivider}
            >
              |
            </Typography.Text>

            <Typography.Link onClick={handleCancelChanges}>
              Отменить
            </Typography.Link>
          </>
        ) : (
          <Typography.Link
            onClick={() => handleEditRow(record)}
            disabled={isEditingInProgress}
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
      onCell: (record: IProductCharacteristics) => ({
        isEditingRow: isEditing(record),
        dataIndex: col.dataIndex,
        record,
        title: "",
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Tooltip title="Добавить характеристику товара.">
        <Button
          className={styles.addCharacteristicsInfoTableAddButton}
          onClick={handleAddNewRow}
          disabled={isEditingInProgress}
          icon={<PlusOutlined />}
        />
      </Tooltip>

      <Table
        components={{ body: { cell: EditableCell } }}
        bordered
        dataSource={recordsData}
        columns={mergedColumns}
        pagination={false}
        showHeader={false}
        locale={{ emptyText: EMPTY_CHARACTERISTICS_TEXT }}
      />
    </Form>
  );
};
