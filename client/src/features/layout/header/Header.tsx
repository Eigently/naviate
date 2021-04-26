/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { lighten } from "polished";
import { ReactComponent as Plane } from "./assets/plane-solid.svg";

import { useAppSelector } from "../../../app/hooks";

import { container } from "../../responsiveness/container";
import { shadow } from "../../style/shadow";

import { selectThemeObject } from "../../theme/selectThemeObject";
import { ThemeToggleButton } from "../../theme/ThemeToggle";

export const Header = () => {
  const theme = useAppSelector(selectThemeObject);

  return (
    <div
      css={css`
        color: white;
        background-color: ${lighten(0.1, theme.colors.naviateDarkBlue)};
        ${shadow.md}
        font-weight: bolder;
        font-size: 1.5rem;
        padding: 1rem 2rem;
      `}
    >
      <div
        css={[
          container,
          css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          `,
        ]}
      >
        <div
          css={css`
            ${container}
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <Plane
            css={css`
              padding: 0rem 0.5rem;
              height: 1.2rem;
            `}
          />
          Naviate
        </div>
        <ThemeToggleButton />
      </div>
    </div>
  );
};
