import { getImageUrl } from "utils/get-image-url";

import styles from "./ImageInCard.module.scss";

interface IImageInCardProps {
  className?: string;
  imageUrl: string;
}

export const ImageInCard = (props: IImageInCardProps) => {
  const { className, imageUrl } = props;

  return (
    <img
      className={`${className} ${styles.imageWrapper}`}
      src={getImageUrl(imageUrl)}
      alt=""
    />
  );
};
