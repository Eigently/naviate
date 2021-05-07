/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { Header } from "./Header";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectThemeObject } from "../theme/selectors/selectThemeObject";
import { selectTheme } from "../theme/selectors/selectTheme";
import { toggleTheme } from "../theme/themeSlice";

export const HeaderContainer: FC = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(selectTheme);
  const themeObject = useAppSelector(selectThemeObject);

  return (
    <Header
      theme={theme}
      themeObject={themeObject}
      handleToggleTheme={() => dispatch(toggleTheme())}
    />
  );
};
