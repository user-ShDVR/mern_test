import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store/store";

import { IArrangeOrderSteps } from "types/IArrangeOrderSteps";

const initialState = {
  arrangeOrderValues: {
    locality: "",
    street: "",
    house: "",
    flat: "",
    comment: "",
    cardNumber: "",
    nameAndSurname: "",
    month: "",
    year: "",
    cvc: "",
  },
};

export const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    setArrangeOrderValues: (
      state,
      action: PayloadAction<IArrangeOrderSteps>
    ) => {
      state.arrangeOrderValues = {
        ...state.arrangeOrderValues,
        ...action.payload,
      };
    },
  },
});

export default orderSlice.reducer;
export const selectOrder = (state: RootState) => state.orderState;
export const { actions: orderActions } = orderSlice;
