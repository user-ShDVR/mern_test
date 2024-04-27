import { Button, Tag, Typography, message } from "antd";
import styles from "./AdminTypesTab.module.scss";
import { ShadowCard } from "../ShadowCard/ShadowCard";
import { getDeclination } from "../../utils/get-declination";
import {
  useDeleteTypesMutation,
  useGetTypesQuery,
} from "../../store/api/types/types-api";
import {
  DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
  TYPES_COUNT_IN_ADMIN_PANEL_PAGE,
} from "../../constants/types-constants";
import { getImageUrl } from "../../utils/get-image-url";
import { IType } from "../../types/ICatalogElement";
import { useGetPaginationBlock } from "../../hooks/use-get-pagination-block";
import { EditTypesModal } from "./EditTypesModal";
import React from "react";
import { Spinner } from "../Spinner/Spinner";

export const AdminTypesTab = () => {
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

  const [deleteType] = useDeleteTypesMutation();

  const declinationTypes = getDeclination({
    one: "каталог",
    few: "каталога",
    many: "каталогов",
    value: typesData?.totalCount,
  });

  const handleOpenEditModal = (type: IType) => {
    setIsOpenEditModal(true);
    setCertainTypeInModal(type);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
    typesDataRefetch();
  };

  const handleDeleteType = (type: IType) => {
    deleteType({ id: String(type.id) });
    message.success("Каталог успешно удален");
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
        <Button type="primary">Создать новую категорию</Button>
      </p>

      <div className={styles.typesWrapperCards}>
        {typesData?.types.map((type: IType) => (
          <ShadowCard className={styles.typeCard} key={type.id}>
            <Button
              className={styles.typeCardEditButton}
              type="primary"
              onClick={() => handleOpenEditModal(type)}
            >
              Редактировать
            </Button>

            <Button
              className={styles.typeCardDeleteButton}
              onClick={() => handleDeleteType(type)}
            >
              Удалить
            </Button>

            <p>
              Идентификатор: <Tag>{type.id}</Tag>
            </p>

            <p className={styles.typeField}>
              Изображение:
              <img
                className={styles.typeImage}
                src={getImageUrl(type.image.filename)}
                alt=""
              />
            </p>

            <p className={styles.typeField}>
              Идентификатор изображения: <Tag>{type.image_id}</Tag>
            </p>

            <p className={styles.typeField}>
              Название: <Tag>{type.name}</Tag>
            </p>

            <p className={styles.typeField}>
              Доступ по URL: <Tag>{type.url}</Tag>
            </p>
          </ShadowCard>
        ))}
      </div>

      <PaginationBlock
        countElementsOnPage={TYPES_COUNT_IN_ADMIN_PANEL_PAGE}
        totalDataCount={typesData?.totalCount}
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
