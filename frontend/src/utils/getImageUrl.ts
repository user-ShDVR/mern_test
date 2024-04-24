export const getImageUrl = (image: string) => {
  return `${import.meta.env.VITE_BASE_URL}/uploads/${image}`;
};
