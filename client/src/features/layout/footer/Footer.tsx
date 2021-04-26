/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { lighten } from "polished";
import { useAppSelector } from "../../../app/hooks";
import { selectThemeObject } from "../../theme/selectThemeObject";

import { container } from "../../responsiveness/container";
import { shadow } from "../../style/shadow";

export const Footer = () => {
  const theme = useAppSelector(selectThemeObject);
  return (
    <div
      css={css`
        ${shadow.surrounding};
        background-color: ${lighten(0.05, theme.colors.background)};
        font-size: 0.8rem;
        padding: 1rem 2rem;
      `}
    >
      <div
        css={css`
          ${container}
        `}
      >
        Copyright &copy; {new Date().getFullYear()} Eigently. All rights
        reserved.
      </div>
    </div>
  );
};
