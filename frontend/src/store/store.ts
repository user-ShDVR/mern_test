import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { defaultApi } from "./api/defaultApi";

export const store = configureStore({
  reducer: {
    [defaultApi.reducerPath]: defaultApi.reducer,
    userState: userReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([defaultApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
