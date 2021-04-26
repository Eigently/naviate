import { createSlice } from "@reduxjs/toolkit";
import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";
import { ThemeObject } from "./themeObject";

export type Theme = "Light" | "Dark";

export interface ThemeState {
  value: Theme;
  object: ThemeObject;
}

let initialState: ThemeState;
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  console.log("Matches dark!");
  console.log("Dark theme: ", darkTheme);
  initialState = {
    value: "Dark",
    object: darkTheme,
  };
} else {
  console.log("Matches light!");
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
      console.log("Current color: ", state);
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
