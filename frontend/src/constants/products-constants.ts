export const PRODUCTS_COUNT_IN_CATALOG_ITEM_PAGE = 4;
export const PRODUCTS_COUNT_IN_ADMIN_PANEL_PAGE = 4;

export const DEFAULT_MIN_PRICE_VALUE = 1;
export const DEFAULT_MAX_PRICE_VALUE = 100000;

export const characteristicsListColumns = [
  {
    dataIndex: "key",
  },
  {
    dataIndex: "value",
  },
];

export const productItemLabels = {
  image: "Изображение продукта",
  name: "Название продукта",
  description: "Описание продукта",
  price: "Цена продукта в ₽",
  category: "Категория продукта",
  characteristics: "Характеристики",
};

export const productItemDataIndexes = {
  image_id: "image_id",
  name: "name",
  description: "description",
  price: "price",
  category: "category",
};
