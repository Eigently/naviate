import { createSlice } from "@reduxjs/toolkit";
import { dark_theme } from "./colors/dark_theme";
import { light_theme } from "./colors/light_theme";
import { ThemeState } from "./interface";

let initialState: ThemeState;
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  initialState = {
    value: "Dark",
    object: dark_theme,
  };
} else {
  initialState = {
    value: "Light",
    object: light_theme,
  };
}

export const theme_slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.value === "Light") {
        state.value = "Dark";
        state.object = dark_theme;
      } else {
        state.value = "Light";
        state.object = light_theme;
      }
    },
  },
});

export const { toggleTheme: toggle_theme } = theme_slice.actions;
export const { reducer } = theme_slice;
