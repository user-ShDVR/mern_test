export const addOrderDeliveryLabels = {
  locality: "Населенный пункт",
  street: "Улица",
  house: "Дом",
  flat: "Квартира",
  comment: "Комментарий",
};

export const addOrderDeliveryDataIndexes = {
  locality: "locality",
  street: "street",
  house: "house",
  flat: "flat",
  comment: "comment",
};

export const citiesOptions = [
  { label: "Москва", value: "Москва" },
  { label: "Санкт-Петербург", value: "Санкт-Петербург" },
  { label: "Новосибирск", value: "Новосибирск" },
  { label: "Екатеринбург", value: "Екатеринбург" },
  { label: "Казань", value: "Казань" },
  { label: "Нижний Новгород", value: "Нижний Новгород" },
  { label: "Челябинск", value: "Челябинск" },
  { label: "Самара", value: "Самара" },
  { label: "Омск", value: "Омск" },
  { label: "Ростов-на-Дону", value: "Ростов-на-Дону" },
  { label: "Уфа", value: "Уфа" },
  { label: "Красноярск", value: "Красноярск" },
  { label: "Пермь", value: "Пермь" },
  { label: "Воронеж", value: "Воронеж" },
  { label: "Волгоград", value: "Волгоград" },
  { label: "Краснодар", value: "Краснодар" },
  { label: "Ульяновск", value: "Ульяновск" },
  { label: "Владивосток", value: "Владивосток" },
  { label: "Ярославль", value: "Ярославль" },
  { label: "Ижевск", value: "Ижевск" },
  { label: "Тюмень", value: "Тюмень" },
  { label: "Барнаул", value: "Барнаул" },
  { label: "Саратов", value: "Саратов" },
];

export const adminOrderFieldsLabels = {
  status: "Статус",
};

export const adminOrderFieldsDataIndexes = {
  status: "status",
};

export const adminOrderStatusOptions = [
  {
    label: "Ожидается оплата",
    value: "Ожидается оплата",
  },
  {
    label: "Оплачен",
    value: "Оплачен",
  },
];

export const adminOrderStatuses = {
  paymentExpect: "Ожидается оплата",
  paid: "Оплачен",
};

export const ordersTableTitles = {
  id: "ID",
  address: "Адрес",
  quantity: "Количество товара",
  created: "Заказ оформлен",
  status: "Статус",
  summary: "Сумма заказа",
  order_products: "Список заказанных товаров:",
};

export const ordersTableDataIndexes = {
  id: "id",
  address: "address",
  quantity: "quantity",
  created: "created",
  status: "status",
  summary: "summary",
  order_products: "order_products",
};

export const ordersAdminTableTitles = {
  id: "ID",
  status: "Статус заказа",
  actions: "Действия",
};

export const ordersAdminTableDataIndexes = {
  id: "id",
  status: "status",
  actionsKey: "actionsKey",
};
