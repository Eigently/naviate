import * as t from "io-ts";
import { brand_colors } from "./brandColors";
import { ThemeObject } from "../interface";

export const light_theme: t.TypeOf<typeof ThemeObject> = {
  colors: {
    base: "#000000",
    background: "#f0f0f0",
    ...brand_colors,
  },
};
