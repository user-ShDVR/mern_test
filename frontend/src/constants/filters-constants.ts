export const DEFAULT_MIN_PRICE = 1;
export const DEFAULT_MAX_PRICE = 10000000;

export const DEFAULT_SORT_BY = "price";
export const DEFAULT_SORT_ORDER = "asc";

export const DEFAULT_SELECT_SORT = "name asc";

export const productsFiltersLabels = {
  from: "От",
  to: "До",
  sort: "Сортировка",
};

export const productsFiltersDataIndexes = {
  from: "minValue",
  to: "maxValue",
};

export const sortOptions = [
  {
    label: "По названию (возрастание)",
    value: "name asc",
  },
  {
    label: "По названию (убывание)",
    value: "name desc",
  },
  {
    label: "По цене (возрастание)",
    value: "price asc",
  },
  {
    label: "По цене (убывание)",
    value: "price desc",
  },
];
