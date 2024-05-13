import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { categoryInfoActions } from "store/features/categoryInfoSlice";
import { searchActions } from "store/features/searchSlice";

const allActions = {
  ...searchActions,
  ...categoryInfoActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
