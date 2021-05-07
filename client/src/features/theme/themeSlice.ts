import { createSlice } from "@reduxjs/toolkit";
import { darkTheme } from "./colors/darkTheme";
import { lightTheme } from "./colors/lightTheme";
import { ThemeState } from "./interface";

let initialState: ThemeState;
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  initialState = {
    value: "Dark",
    object: darkTheme,
  };
} else {
  initialState = {
    value: "Light",
    object: lightTheme,
  };
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.value === "Light") {
        state.value = "Dark";
        state.object = darkTheme;
      } else {
        state.value = "Light";
        state.object = lightTheme;
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const { reducer } = themeSlice;
