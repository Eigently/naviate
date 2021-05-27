import * as t from "io-ts";
import { brand_colors } from "./brandColors";
import { ThemeObject } from "../interface";

export const dark_theme: t.TypeOf<typeof ThemeObject> = {
  colors: {
    base: "#ffffff",
    background: "#161616",
    ...brand_colors,
  },
};
