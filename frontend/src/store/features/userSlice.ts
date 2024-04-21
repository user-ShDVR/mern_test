import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../api/types";
import { RootState } from "../store";

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload.user;
    },
  },
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.userState;
export const { actions: userActions } = userSlice;
