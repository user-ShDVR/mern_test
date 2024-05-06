import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { orderActions } from "store/features/orderSlice";
import { userActions } from "store/features/userSlice";

const allActions = {
  ...userActions,
  ...orderActions
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
