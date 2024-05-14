export const PRODUCTS_COUNT_IN_MAIN_PAGE = 4;
export const PRODUCTS_COUNT_IN_CATALOG_ITEM_PAGE = 4;
export const PRODUCTS_COUNT_IN_ADMIN_PANEL_PAGE = 4;

export const adminProductCharacteristicsListColumns = [
  {
    dataIndex: "key",
  },
  {
    dataIndex: "value",
  },
];

export const adminProductCharacteristicsDataIndexes = {
  key: "key",
  value: "value",
};

export const emptyCharacteristicsText = "Нет характеристик товара";

export const adminProductCharacteristicsPlaceholders = {
  key: "Введите поле",
  value: "Введите значение",
};

export const adminProductFieldsLabels = {
  image: "Изображение продукта",
  name: "Название продукта",
  description: "Описание продукта",
  price: "Цена продукта в ₽",
  type: "Категория продукта",
  characteristics: "Характеристики",
};

export const adminProductFieldsDataIndexes = {
  image_id: "image_id",
  name: "name",
  description: "description",
  price: "price",
  type_id: "type_id",
};
