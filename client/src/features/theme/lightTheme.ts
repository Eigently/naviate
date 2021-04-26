import { brandColors } from "./brandColors";
import { ThemeObject } from "./themeObject";

export const lightTheme: ThemeObject = {
  colors: {
    base: "#000000",
    background: "#eeeeee",
    ...brandColors,
  },
};
