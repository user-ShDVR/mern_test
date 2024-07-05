import React from "react";

import { Table } from "antd";

import {
  accountAdminTableDataIndexes,
  accountAdminTableTitles,
} from "constants/account-constants";
import { EMPTY_ADMIN_TAB_TABLE_TEXT } from "constants/general-constants";

import { addKeysToObjectInArray } from "utils/add-keys-to-object-in-array";

import { IUser } from "types/IUser";

import styles from "./UsersTabTable.module.scss";

interface IUsersTabTableProps {
  usersData: IUser[];
}

export const UsersTabTable = (props: IUsersTabTableProps) => {
  const { usersData } = props;

  const tableData = React.useMemo(
    () =>
      usersData?.length ?? 0 > 0
        ? addKeysToObjectInArray<IUser>({ array: [...usersData] })
        : [],
    [usersData]
  );

  const columns = [
    {
      title: accountAdminTableTitles.id,
      dataIndex: accountAdminTableDataIndexes.id,
      key: accountAdminTableDataIndexes.id,
    },
    {
      title: accountAdminTableTitles.name,
      dataIndex: accountAdminTableDataIndexes.name,
      key: accountAdminTableDataIndexes.name,
    },
    {
      title: accountAdminTableTitles.surname,
      dataIndex: accountAdminTableDataIndexes.surname,
      key: accountAdminTableDataIndexes.surname,
    },
    {
      title: accountAdminTableTitles.lastname,
      dataIndex: accountAdminTableDataIndexes.lastname,
      key: accountAdminTableDataIndexes.lastname,
    },
    {
      title: accountAdminTableTitles.email,
      dataIndex: accountAdminTableDataIndexes.email,
      key: accountAdminTableDataIndexes.email,
    },
    {
      title: accountAdminTableTitles.role,
      dataIndex: accountAdminTableDataIndexes.role,
      key: accountAdminTableDataIndexes.role,
    },
  ];

  return (
    <Table
      className={styles.usersTabTableWrapper}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      bordered
      locale={{ emptyText: EMPTY_ADMIN_TAB_TABLE_TEXT }}
    />
  );
};
