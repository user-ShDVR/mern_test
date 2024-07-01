import React from "react";

interface ISearchValueProps {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}

export const SearchValueContext = React.createContext<ISearchValueProps>({
  searchValue: "",
  setSearchValue: () => {},
});

interface ISearchValueProviderProps {
  children: React.ReactNode;
}

export const SearchValueProvider = ({
  children,
}: ISearchValueProviderProps) => {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <SearchValueContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchValueContext.Provider>
  );
};
