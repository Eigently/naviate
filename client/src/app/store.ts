import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as themeReducer } from "../features/theme/themeSlice";
import { reducer as e6bReducer } from "../features/e6b/e6bSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    e6b: e6bReducer,
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
