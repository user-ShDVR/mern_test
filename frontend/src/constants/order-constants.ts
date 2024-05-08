export const DEFAULT_ORDER_LIMIT_IN_ORDERS_PAGE = 3;
export const ORDERS_COUNT_IN_ADMIN_PANEL_PAGE = 4;

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
