import React from "react";

import { Button, Tag, Typography, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";
import { ImageInCard } from "components/ImageInCard/ImageInCard";
import { ShadowCard } from "components/ShadowCard/ShadowCard";
import { Spinner } from "components/Spinner/Spinner";

import {
  useDeleteImagesMutation,
  useGetImagesQuery,
} from "store/api/images/images-api";

import { IMAGES_COUNT_IN_ADMIN_PANEL_PAGE } from "constants/images-constants";

import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";

import { getDeclination } from "utils/get-declination";

import { IImage } from "types/IImage";

import { AddImageModal } from "./AddImageModal";

export const AdminImagesTab = () => {
  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);

  const { PaginationBlock } = useGetPaginationBlock();

  const { data: imagesData, isLoading: isImagesDataLoading } =
    useGetImagesQuery(null);

  const isEmptyImagesData = imagesData?.images?.length === 0;

  const [
    deleteImage,
    {
      isLoading: isDeleteImageLoading,
      isSuccess: isDeleteImageSuccess,
      isError: isDeleteImageError,
    },
  ] = useDeleteImagesMutation();

  const handleDeleteImage = async (image: IImage) => {
    await deleteImage({ id: image.id });
  };

  React.useEffect(() => {
    if (!isDeleteImageLoading && isDeleteImageSuccess) {
      message.success("Изображение успешно удалено");
    } else if (!isDeleteImageLoading && isDeleteImageError) {
      message.error("Произошла ошибка при удалении изображения");
    }
  }, [isDeleteImageSuccess, isDeleteImageError, isDeleteImageLoading]);

  const handleOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setIsOpenAddModal(false);
  };

  const declinationImages = getDeclination({
    one: "изображение",
    few: "изображения",
    many: "изображений",
    value: imagesData?.totalCount ?? 0,
  });

  if (isImagesDataLoading) {
    <Spinner />;
  }

  return (
    <>
      <Typography.Text className={styles.entityCountTitle}>
        В системе - <b>{declinationImages}</b>
      </Typography.Text>

      <Button
        className={styles.entityCreateButton}
        type="primary"
        onClick={handleOpenAddModal}
      >
        Добавить новое изображение
      </Button>

      <div className={styles.entityWrapperCards}>
        {imagesData?.images.map((image: IImage) => (
          <ShadowCard
            key={image.id}
            cover={<ImageInCard imageUrl={image.filename} />}
          >
            <Button
              className={styles.entityCardDeleteButton}
              onClick={() => handleDeleteImage(image)}
            >
              Удалить
            </Button>

            <p>
              Идентификатор: <Tag>{image.id}</Tag>
            </p>
          </ShadowCard>
        ))}
      </div>

      {!isEmptyImagesData && (
        <PaginationBlock
          countElementsOnPage={IMAGES_COUNT_IN_ADMIN_PANEL_PAGE}
          totalCount={imagesData?.totalCount}
        />
      )}

      <AddImageModal
        isOpenAddModal={isOpenAddModal}
        onCloseAddModal={handleCloseAddModal}
      />
    </>
  );
};
