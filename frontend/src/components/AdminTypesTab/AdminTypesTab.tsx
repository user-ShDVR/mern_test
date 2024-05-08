import React from "react";

import { Button, Tag, Typography, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";
import { ShadowCard } from "components/ShadowCard/ShadowCard";
import { Spinner } from "components/Spinner/Spinner";

import {
  useDeleteTypesMutation,
  useGetTypesQuery,
} from "store/api/types/types-api";

import {
  DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
  TYPES_COUNT_IN_ADMIN_PANEL_PAGE,
} from "constants/types-constants";

import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";

import { getDeclination } from "utils/get-declination";
import { getImageUrl } from "utils/get-image-url";

import { IType } from "types/IType";

import { AddTypeModal } from "./AddTypeModal";
import { EditTypesModal } from "./EditTypesModal";

export const AdminTypesTab = () => {
  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);

  const [certainTypeInModal, setCertainTypeInModal] = React.useState(
    {} as IType
  );

  const { currentPage, PaginationBlock } = useGetPaginationBlock();

  const {
    data: typesData,
    isLoading: isTypesLoading,
    refetch: typesDataRefetch,
  } = useGetTypesQuery({
    page: currentPage,
    limit: DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
  });

  const isEmptyTypesData = typesData?.types?.length === 0;

  const [deleteType] = useDeleteTypesMutation();

  const declinationTypes = getDeclination({
    one: "каталог",
    few: "каталога",
    many: "каталогов",
    value: typesData?.totalCount,
  });

  const handleOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setIsOpenAddModal(false);
    typesDataRefetch();
  };

  const handleOpenEditModal = (type: IType) => {
    setIsOpenEditModal(true);
    setCertainTypeInModal(type);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
    typesDataRefetch();
  };

  const handleDeleteType = (type: IType) => {
    deleteType({ id: type.id }).then((response) => {
      if (response.error.originalStatus) {
        message.success(response.error.data);
      } else if (response.error.status === 404) {
        message.error(response.error.data.message);
      } else {
        message.error("Произошла ошибка при удалении каталога");
      }
    });

    typesDataRefetch();
  };

  if (isTypesLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography.Text className={styles.countTitle}>
        В системе - <b>{declinationTypes}</b>
      </Typography.Text>

      <p className={styles.createButton}>
        <Button type="primary" onClick={handleOpenAddModal}>
          Создать новую категорию
        </Button>
      </p>

      <div className={styles.entityWrapperCards}>
        {typesData?.types.map((type: IType) => (
          <ShadowCard className={styles.entityCard} key={type.id}>
            <Button
              className={styles.entityCardEditButton}
              type="primary"
              onClick={() => handleOpenEditModal(type)}
            >
              Редактировать
            </Button>

            <Button
              className={styles.entityCardDeleteButton}
              onClick={() => handleDeleteType(type)}
            >
              Удалить
            </Button>

            <p>
              Идентификатор: <Tag>{type.id}</Tag>
            </p>

            <p className={styles.entityField}>
              Изображение:
              <img
                className={styles.entityImage}
                src={getImageUrl(type.image.filename)}
                alt=""
              />
            </p>

            <p className={styles.entityField}>
              Идентификатор изображения: <Tag>{type.image_id}</Tag>
            </p>

            <p className={styles.entityField}>
              Название: <Tag>{type.name}</Tag>
            </p>

            <p className={styles.entityField}>
              Доступ по URL: <Tag>{type.url}</Tag>
            </p>
          </ShadowCard>
        ))}
      </div>

      {!isEmptyTypesData && (
        <PaginationBlock
          countElementsOnPage={TYPES_COUNT_IN_ADMIN_PANEL_PAGE}
          totalCount={typesData?.totalCount}
        />
      )}

      <AddTypeModal
        isOpenAddModal={isOpenAddModal}
        onCloseAddModal={handleCloseAddModal}
        typesDataRefetch={typesDataRefetch}
      />

      <EditTypesModal
        isOpenEditModal={isOpenEditModal}
        onCloseEditModal={handleCloseEditModal}
        certainTypeInModal={certainTypeInModal}
        typesDataRefetch={typesDataRefetch}
      />
    </>
  );
};
