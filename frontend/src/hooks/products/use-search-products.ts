import { useSelector } from "react-redux";

import { selectSearch } from "store/features/searchSlice";

import { useActions } from "hooks/general/use-actions";

export const useSearchProducts = () => {
  const { searchValue } = useSelector(selectSearch);
  const { setSearchValue } = useActions();

  const handleSearchProducts = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  return { searchValue, handleSearchProducts };
};
