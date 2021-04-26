/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAppSelector } from "../../../app/hooks";
import { selectThemeObject } from "../../theme/selectThemeObject";

import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

export const Page = () => {
  const theme = useAppSelector(selectThemeObject);

  return (
    <div
      css={css`
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        color: ${theme.colors.base};
        background-color: ${theme.colors.background};
      `}
    >
      <Header />
      <div
        css={css`
          flex-grow: 1;
        `}
      />
      <Footer />
    </div>
  );
};
