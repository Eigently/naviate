import * as t from "io-ts";
import { createSlice } from "@reduxjs/toolkit";
import { dark_theme } from "./colors/dark_theme";
import { light_theme } from "./colors/light_theme";
import { ThemeState } from "./interface";

let initialState: t.TypeOf<typeof ThemeState>;
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  initialState = {
    value: "dark",
    object: dark_theme,
  };
} else {
  initialState = {
    value: "light",
    object: light_theme,
  };
}

export const theme_slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle_theme: (state) => {
      if (state.value === "light") {
        state.value = "dark";
        state.object = dark_theme;
      } else {
        state.value = "light";
        state.object = light_theme;
      }
    },
  },
});

export const { toggle_theme } = theme_slice.actions;
export const { reducer } = theme_slice;
