export type Theme = "Light" | "Dark";

export interface ThemeState {
  value: Theme;
  object: ThemeObject;
}

export interface ThemeObject {
  colors: {
    // The base colors, elevate by lightening
    base: string;
    background: string;

    // Brand colors
    naviateDarkBlue: string;
    naviateLightBlue: string;
    naviateRed: string;
    naviateOrange: string;
    naviateYellow: string;
  };
}
