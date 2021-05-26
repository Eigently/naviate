import * as t from "io-ts";

export const Theme = t.keyof({
  light: null,
  dark: null,
});

export const ThemeObject = t.type({
  colors: t.type({
    // The base colors, elevate by lightening
    base: t.string,
    background: t.string,

    // Brand colors
    naviate_dark_blue: t.string,
    naviate_light_blue: t.string,
    naviate_red: t.string,
    naviate_orange: t.string,
    naviate_yellow: t.string,
  }),
});

export const ThemeState = t.type({
  value: Theme,
  object: ThemeObject,
});
