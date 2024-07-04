import React from "react";

import { DEFAULT_SEARCH_DATA } from "constants/general-constants";

import { ISearchData } from "types/ISearchData";

interface ISearchDataProps {
  searchData: ISearchData;
  setSearchData: React.Dispatch<React.SetStateAction<ISearchData>>;
}

export const SearchDataContext = React.createContext<ISearchDataProps>({
  searchData: DEFAULT_SEARCH_DATA,
  setSearchData: () => {},
});

interface ISearchDataProviderProps {
  children: React.ReactNode;
}

export const SearchDataProvider = (props: ISearchDataProviderProps) => {
  const { children } = props;

  const [searchData, setSearchData] =
    React.useState<ISearchData>(DEFAULT_SEARCH_DATA);

  return (
    <SearchDataContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchDataContext.Provider>
  );
};
