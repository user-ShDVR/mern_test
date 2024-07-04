import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Pagination, Spin, Tooltip, Typography } from "antd";

import { useGetTypesQuery } from "store/api/types/types-api";

import { getDeclination } from "utils/get-declination";

import { IType } from "types/IType";

import { AddTypeModal } from "./AddTypeModal/AddTypeModal";
import styles from "./AdminTypesTab.module.scss";
import { EditTypesModal } from "./EditTypesModal/EditTypesModal";
import { TypesTabTable } from "./TypesTabTable/TypesTabTable";

export const AdminTypesTab = () => {
  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);
  const [typeDataInModal, setTypeDataInModal] = React.useState({} as IType);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data: typesData, isLoading: isTypesLoading } = useGetTypesQuery(
    {
      page: currentPage,
      limit: 5,
    },
    { skip: isOpenAddModal || isOpenEditModal }
  );

  const isEmptyTypesData = typesData?.types?.length === 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const declinationTypes = getDeclination({
    one: "категория",
    few: "категории",
    many: "категорий",
    value: typesData?.totalCount,
  });

  const handleOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setIsOpenAddModal(false);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  if (isTypesLoading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Typography.Text className={styles.adminTypesTabTitle}>
        В системе - <b>{declinationTypes}</b>
      </Typography.Text>

      <Tooltip title="Добавить категорию.">
        <Button
          className={styles.adminTypesTabAddTypeButton}
          onClick={handleOpenAddModal}
          icon={<PlusOutlined />}
        />
      </Tooltip>

      <TypesTabTable
        typesData={typesData?.types ?? []}
        setIsOpenEditModal={setIsOpenEditModal}
        setTypeDataInModal={setTypeDataInModal}
      />

      {!isEmptyTypesData && (
        <Pagination
          className={styles.adminTypesTabPaginationWrapper}
          pageSize={5}
          total={typesData?.totalCount}
          onChange={handlePageChange}
          current={currentPage}
        />
      )}

      <AddTypeModal
        isOpenAddModal={isOpenAddModal}
        onCloseAddModal={handleCloseAddModal}
      />

      <EditTypesModal
        isOpenEditModal={isOpenEditModal}
        onCloseEditModal={handleCloseEditModal}
        typeDataInModal={typeDataInModal}
      />
    </>
  );
};
