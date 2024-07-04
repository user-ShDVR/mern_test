import React from "react";

import { Filters } from "components/Filters/Filters";

import {
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_PRICE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
} from "constants/filters-constants";

import { TObjWithNumberValues } from "types/TObjWithNumberValues";

export const useGetProductsFilters = () => {
  const [minValue, setMinValue] = React.useState(DEFAULT_MIN_PRICE);
  const [maxValue, setMaxValue] = React.useState(DEFAULT_MAX_PRICE);

  const [sortOrder, setSortOrder] = React.useState(DEFAULT_SORT_ORDER);
  const [sortBy, setSortBy] = React.useState(DEFAULT_SORT_BY);

  const handleFilter = (values: TObjWithNumberValues) => {
    setMinValue(values.minValue || DEFAULT_MIN_PRICE);
    setMaxValue(values.maxValue || DEFAULT_MAX_PRICE);
  };

  const handleSort = (value: string) => {
    if (value === "name asc") {
      setSortOrder("asc");
      setSortBy("name");
    }

    if (value === "name desc") {
      setSortOrder("desc");
      setSortBy("name");
    }

    if (value === "price asc") {
      setSortOrder("asc");
      setSortBy("price");
    }

    if (value === "price desc") {
      setSortOrder("desc");
      setSortBy("price");
    }
  };

  const FiltersAside = (
    <Filters
      minValue={minValue}
      maxValue={maxValue}
      setMinValue={setMinValue}
      setMaxValue={setMaxValue}
      handleFilter={handleFilter}
      handleSort={handleSort}
    />
  );

  return { FiltersAside, minValue, maxValue, sortOrder, sortBy };
};
