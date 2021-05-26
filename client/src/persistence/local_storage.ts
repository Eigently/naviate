import { RootState } from "../state/store";
import { load_theme_state, save_theme_state } from "../theme/persist_theme";

export const load_state = () => {
  return {
    theme: load_theme_state(),
  };
};

export const save_state = (state: RootState): void => {
  save_theme_state(state.theme);
};
