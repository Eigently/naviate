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
    naviate_dark_blue: string;
    naviate_light_blue: string;
    naviate_red: string;
    naviate_orange: string;
    naviate_yellow: string;
  };
}
