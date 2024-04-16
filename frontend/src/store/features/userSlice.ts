import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserFields, IUserState } from "../api/types";
import { RootState } from "../store";

const initialState: IUserState = {
  token: null,
  user: null,
};
export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action: PayloadAction<IUserFields>) => {
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
      }

      const userFields = {
        email: action.payload.email,
        name: action.payload.name,
        gender: action.payload.gender,
        birth_date: action.payload.birth_date,
        avatarUrl: action.payload.avatarUrl,
      };

      state.user = userFields;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
    },
  },
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.userState;
export const { logout, setUser } = userSlice.actions;
