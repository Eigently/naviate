import { brandColors } from "./brandColors";
import { ThemeObject } from "../interface";

export const lightTheme: ThemeObject = {
  colors: {
    base: "#000000",
    background: "#eeeeee",
    ...brandColors,
  },
};
