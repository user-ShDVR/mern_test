import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

const initialState = {
  searchValue: "",
};

const searchSlice = createSlice({
  initialState,
  name: "search",
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const selectSearch = (state: RootState) => state.searchState;
export const { actions: searchActions } = searchSlice;
