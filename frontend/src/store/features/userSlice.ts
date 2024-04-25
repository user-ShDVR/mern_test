import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser, IUserState } from "../../types/IUserState";

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
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
