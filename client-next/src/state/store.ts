import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as e6bReducer } from "../e6b/e6b_slice";
import { reducer as dAtisReducer } from "../d_atis/d_atis_slice";
import { reducer as serverVersionReducer } from "../server_version/server_version_slice";

export const store = configureStore({
  reducer: {
    e6b: e6bReducer,
    dAtis: dAtisReducer,
    serverVersion: serverVersionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
