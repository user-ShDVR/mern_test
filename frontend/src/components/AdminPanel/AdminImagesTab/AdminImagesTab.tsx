import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Pagination,
  Spin,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd";

import { ImageInCard } from "components/ImageInCard/ImageInCard";
import { ShadowCard } from "components/ShadowCard/ShadowCard";

import {
  useDeleteImagesMutation,
  useGetImagesQuery,
} from "store/api/images/images-api";

import { DEFAULT_PAGE_SIZE } from "constants/general-constants";

import { useContexts } from "hooks/general/use-contexts";
import { useGetPaginatedData } from "hooks/general/use-get-paginated-data";

import { getDeclination } from "utils/get-declination";

import { IImage } from "types/IImage";

import { AddImageModal } from "./AddImageModal/AddImageModal";
import styles from "./AdminImagesTab.module.scss";

export const AdminImagesTab = () => {
  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);

  const {
    currentPageContext: { currentPage, setCurrentPage },
  } = useContexts();

  const { data: imagesData, isLoading: isImagesDataLoading } =
    useGetImagesQuery();

  const isEmptyImagesData = imagesData?.images?.length === 0;

  const { paginatedData } = useGetPaginatedData({
    data: imagesData?.images,
    currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const declinationImages = getDeclination({
    one: "изображение",
    few: "изображения",
    many: "изображений",
    value: imagesData?.totalCount ?? 0,
  });

  if (isImagesDataLoading) {
    <Spin />;
  }

  return (
    <>
      <Typography.Text className={styles.adminImagesTabTitle}>
        В системе - <b>{declinationImages}</b>
      </Typography.Text>

      <Tooltip title="Добавить изображение.">
        <Button
          className={styles.adminImagesTabAddImageButton}
          onClick={handleOpenAddModal}
          icon={<PlusOutlined />}
        />
      </Tooltip>

      <div className={styles.adminImagesTabImageWrapper}>
        {paginatedData?.map((image: IImage) => (
          <ShadowCard
            key={image.id}
            cover={<ImageInCard imageUrl={image.filename} />}
          >
            <Button
              className={styles.adminImagesTabDeleteImageButton}
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
        <Pagination
          className={styles.adminImagesTabPaginationWrapper}
          pageSize={DEFAULT_PAGE_SIZE}
          total={imagesData?.totalCount}
          onChange={handlePageChange}
          current={currentPage}
        />
      )}

      <AddImageModal
        isOpenAddModal={isOpenAddModal}
        onCloseAddModal={handleCloseAddModal}
      />
    </>
  );
};
