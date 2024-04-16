import { configureStore, isRejectedWithValue,  ThunkAction, Action } from "@reduxjs/toolkit";
import { usersApi } from "./api/usersApi.ts";
import { uploadApi } from "./api/uploadApi.ts";
import { authApi } from './api/authApi';
import userReducer from './features/userSlice';

export const rtkQueryErrorLogger =
  () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      console.warn(action.payload.data.error)
      const errorMessage = Array.isArray(action.payload.data.message)
        ? action.payload.data.message[0]
        : action.payload.data.message;

      console.warn(errorMessage);
    }
    return next(action)
  }

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    userState: userReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      rtkQueryErrorLogger,
      usersApi.middleware,
      uploadApi.middleware,
      authApi.middleware,
    ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;