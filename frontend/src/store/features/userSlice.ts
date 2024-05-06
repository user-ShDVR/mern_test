import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

import { IUser } from "types/IUser";
import { IUserState } from "types/IUserState";

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.userState;
export const { actions: userActions } = userSlice;
