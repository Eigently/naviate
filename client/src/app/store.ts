import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as themeReducer } from "../features/theme/themeSlice";
import { reducer as e6bReducer } from "../features/e6b/e6bSlice";
import { reducer as versionReducer } from "../features/version/versionSlice";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    e6b: e6bReducer,
    version: versionReducer,
  },
  preloadedState: loadState(),
});

const throttledSaveState = throttle(() => {
  saveState(store.getState());
}, 1000);

store.subscribe(throttledSaveState);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
