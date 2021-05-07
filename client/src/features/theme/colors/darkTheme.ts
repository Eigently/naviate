import { brandColors } from "./brandColors";
import { ThemeObject } from "../interface";

export const darkTheme: ThemeObject = {
  colors: {
    base: "#ffffff",
    background: "#000",
    ...brandColors,
  },
};
