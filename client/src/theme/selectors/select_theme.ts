import { RootState } from "../../state/store";

export const select_theme = (state: RootState) => state.theme.value;
