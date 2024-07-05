import React from "react";

import { Popconfirm, Table, Typography } from "antd";

import { useDeleteTypesMutation } from "store/api/types/types-api";

import { EMPTY_ADMIN_TAB_TABLE_TEXT } from "constants/general-constants";
import {
  typesAdminTableDataIndexes,
  typesAdminTableTitles,
} from "constants/types-constants";

import { useGetQueryMessages } from "hooks/general/use-get-query-messages";

import { addKeysToObjectInArray } from "utils/add-keys-to-object-in-array";
import { getImageUrl } from "utils/get-image-url";

import { IImage } from "types/IImage";
import { IType } from "types/IType";

import styles from "./TypesTabTable.module.scss";

interface ITypesTabTableProps {
  typesData: IType[];
  setIsOpenEditModal: (isOpenEditModal: boolean) => void;
  setTypeDataInModal: (type: IType) => void;
}

export const TypesTabTable = (props: ITypesTabTableProps) => {
  const { typesData, setIsOpenEditModal, setTypeDataInModal } = props;

  const tableData = React.useMemo(
    () =>
      typesData?.length ?? 0 > 0
        ? addKeysToObjectInArray<IType>({ array: [...typesData] })
        : [],
    [typesData]
  );

  const [
    deleteType,
    {
      isLoading: isDeleteTypeLoading,
      isSuccess: isDeleteTypeSuccess,
      status: deleteTypeStatus,
      error: errorDeleteTypeData,
    },
  ] = useDeleteTypesMutation();

  const handleDeleteType = async (type: IType) => {
    await deleteType({ id: type.id });
  };

  useGetQueryMessages({
    isLoading: isDeleteTypeLoading,
    isSuccess: isDeleteTypeSuccess,
    status: deleteTypeStatus,
    error: errorDeleteTypeData,
    successMessage: "Категория успешно удалена.",
    errorMessage: "Произошла ошибка при удалении категории.",
  })

  const handleOpenEditModal = (type: IType) => {
    setIsOpenEditModal(true);
    setTypeDataInModal(type);
  };

  const columns = [
    {
      title: typesAdminTableTitles.id,
      dataIndex: typesAdminTableDataIndexes.id,
      key: typesAdminTableDataIndexes.id,
    },
    {
      title: typesAdminTableTitles.name,
      dataIndex: typesAdminTableDataIndexes.name,
      key: typesAdminTableDataIndexes.name,
    },
    {
      title: typesAdminTableTitles.image,
      dataIndex: typesAdminTableDataIndexes.image,
      key: typesAdminTableDataIndexes.image,
      render: (record: IImage) => (
        <img
          className={styles.typeImage}
          src={getImageUrl(record.filename)}
          alt=""
        />
      ),
    },
    {
      title: typesAdminTableTitles.url,
      dataIndex: typesAdminTableDataIndexes.url,
      key: typesAdminTableDataIndexes.url,
    },
    {
      title: typesAdminTableTitles.actions,
      key: typesAdminTableDataIndexes.actionsKey,
      render: (record: IType) => (
        <>
          <Typography.Link onClick={() => handleOpenEditModal(record)}>
            Редактировать
          </Typography.Link>

          <Typography.Text className={styles.typesTabTableActionsDivider}>
            |
          </Typography.Text>

          <Popconfirm
            title="Вы действительно хотите удалить эту категорию?"
            onConfirm={() => handleDeleteType(record)}
            okText="Да"
            cancelText="Нет"
          >
            <Typography.Link>Удалить</Typography.Link>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table
      className={styles.typesTabTableWrapper}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      bordered
      locale={{ emptyText: EMPTY_ADMIN_TAB_TABLE_TEXT }}
    />
  );
};
