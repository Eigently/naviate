import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as theme_reducer } from "../theme/theme_slice";
import { reducer as e6b_reducer } from "../e6b/e6b_slice";
import { reducer as d_atis_reducer } from "../d_atis/d_atis_slice";
import { reducer as server_version_reducer } from "../server_version/server_version_slice";
import { load_state, save_state } from "../persistence/local_storage";
import { throttle } from "lodash";

export const store = configureStore({
  reducer: {
    theme: theme_reducer,
    e6b: e6b_reducer,
    d_atis: d_atis_reducer,
    server_version: server_version_reducer,
  },
  preloadedState: load_state(),
});

const throttled_save_state = throttle(() => {
  save_state(store.getState());
}, 1000);

store.subscribe(throttled_save_state);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
