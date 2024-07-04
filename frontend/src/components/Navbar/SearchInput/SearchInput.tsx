import React from "react";

import { Input } from "antd";
import { useNavigate } from "react-router-dom";

import { useGetSearchDataQuery } from "store/api/search/search-api";

import { RouterPath } from "configs/route-config";

import { DEFAULT_SEARCH_DATA } from "constants/general-constants";

import { useContexts } from "hooks/general/use-contexts";

import styles from "./SearchInput.module.scss";

export const SearchInput = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const navigate = useNavigate();

  const {
    searchDataContext: { setSearchData },
  } = useContexts();

  const { data: searchData } = useGetSearchDataQuery({
    query: searchValue,
  });

  React.useEffect(() => {
    setSearchData(searchData ?? DEFAULT_SEARCH_DATA);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

  const handleSearchProducts = (value: string) => {
    setSearchValue(value);
    setSearchData(searchData ?? DEFAULT_SEARCH_DATA);
    navigate(`${RouterPath.search_result}`);
  };

  return (
    <Input.Search
      className={styles.searchInputWrapper}
      placeholder="Найти товары или категории..."
      onSearch={handleSearchProducts}
      allowClear
    />
  );
};
