import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

const initialState = {
  categoryTypeName: "",
  categoryTypeUrl: "",
};

const categoryInfoSlice = createSlice({
  initialState,
  name: "categoryInfo",
  reducers: {
    setCategoryTypeName: (state, action: PayloadAction<string>) => {
      state.categoryTypeName = action.payload;
    },

    setCategoryTypeUrl: (state, action: PayloadAction<string>) => {
      state.categoryTypeUrl = action.payload;
    },
  },
});

export default categoryInfoSlice.reducer;
export const selectCategoryInfo = (state: RootState) => state.categoryInfoState;
export const { actions: categoryInfoActions } = categoryInfoSlice;
