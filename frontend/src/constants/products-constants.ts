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

export const characteristicsInitialValues = {
  key: "",
  value: "",
};

export const characteristicsDataIndexes = {
  key: "key",
  value: "value",
}

export const characteristicsPlaceholders = {
  key: "Введите поле",
  value: "Введите значение",
}

export const productItemLabels = {
  image: "Изображение продукта",
  name: "Название продукта",
  description: "Описание продукта",
  price: "Цена продукта в ₽",
  type: "Категория продукта",
  characteristics: "Характеристики",
};

export const productItemDataIndexes = {
  image_id: "image_id",
  name: "name",
  description: "description",
  price: "price",
  type_id: "type_id",
};
