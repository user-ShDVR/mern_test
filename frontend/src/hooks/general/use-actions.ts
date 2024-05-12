import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { searchActions } from "store/features/searchSlice";

const allActions = {
  ...searchActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
