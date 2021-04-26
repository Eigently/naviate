import { brandColors } from "./brandColors";
import { ThemeObject } from "./themeObject";

export const darkTheme: ThemeObject = {
  colors: {
    base: "#ffffff",
    background: "#111111",
    ...brandColors,
  },
};
