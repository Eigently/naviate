import { RootState } from "../state/store";
import { ThemeState } from "./interface";

export const load_theme_state = () => {
  const serialized_state_str = localStorage.getItem("theme");
  if (serialized_state_str === null) return undefined;

  const serialized_state = JSON.parse(serialized_state_str);
  if (ThemeState.is(serialized_state)) return serialized_state;

  return undefined;
};

export const save_theme_state = (state: RootState["theme"]) => {
  const serialized_state = JSON.stringify(state);
  localStorage.setItem("theme", serialized_state);
};
