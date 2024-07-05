import React from "react";

import { DEFAULT_SEARCH_DATA } from "constants/general-constants";

import { ISearchData } from "types/ISearchData";

interface ISearchDataProps {
  searchData: ISearchData;
  setSearchData: React.Dispatch<React.SetStateAction<ISearchData>>;
  searchQueryString: string;
  setSearchQueryString: (searchQueryString: string) => void;
}

export const SearchDataContext = React.createContext<ISearchDataProps>({
  searchData: DEFAULT_SEARCH_DATA,
  setSearchData: () => {},
  searchQueryString: "",
  setSearchQueryString: () => {},
});

interface ISearchDataProviderProps {
  children: React.ReactNode;
}

export const SearchDataProvider = (props: ISearchDataProviderProps) => {
  const { children } = props;

  const [searchData, setSearchData] =
    React.useState<ISearchData>(DEFAULT_SEARCH_DATA);

  const [searchQueryString, setSearchQueryString] = React.useState("");

  return (
    <SearchDataContext.Provider
      value={{
        searchData,
        setSearchData,
        searchQueryString,
        setSearchQueryString,
      }}
    >
      {children}
    </SearchDataContext.Provider>
  );
};
