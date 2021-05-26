import { brand_colors } from "./brandColors";
import { ThemeObject } from "../interface";

export const dark_theme: ThemeObject = {
  colors: {
    base: "#ffffff",
    background: "#000",
    ...brand_colors,
  },
};
