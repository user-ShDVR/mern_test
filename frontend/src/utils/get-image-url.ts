export const getImageUrl = (imageName: string) => {
  return `${import.meta.env.VITE_BASE_URL}/uploads/${imageName}`;
};
