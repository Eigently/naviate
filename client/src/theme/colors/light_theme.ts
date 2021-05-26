import { brand_colors } from "./brandColors";
import { ThemeObject } from "../interface";

export const light_theme: ThemeObject = {
  colors: {
    base: "#000000",
    background: "#eeeeee",
    ...brand_colors,
  },
};
