import { RootState } from "../../app/store";

export const selectTheme = (state: RootState) => state.theme.value;
export const selectThemeObject = (state: RootState) => state.theme.object;
