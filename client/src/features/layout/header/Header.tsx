/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Plane } from "./assets/wings.svg";

import { useAppSelector } from "../../../app/hooks";

import { container } from "../../responsiveness/container";
import { shadow } from "../../style/shadow";

import { selectThemeObject } from "../../theme/selectThemeObject";
import { ThemeToggleButton } from "../../theme/ThemeToggle";

export const Header = () => {
  const theme = useAppSelector(selectThemeObject);

  const menuItemPadding = css`
    padding: 0rem 0.5rem;
  `;

  return (
    <div
      css={css`
        color: white;
        background-color: ${theme.colors.naviateDarkBlue};
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
            align-items: flex-end;
          `}
        >
          <Plane
            css={css`
              padding-right: 1rem;
              height: 2rem;
            `}
          />
          <div
            css={css`
              ${container}
              display: flex;
              flex-direction: row;
              font-size: 1.2rem;
              font-weight: lighter;
              align-items: flex-end;
            `}
          >
            <div css={menuItemPadding}>E6B</div>
            <div css={menuItemPadding}>Performance</div>
            <div css={menuItemPadding}>Plan</div>
            <div css={menuItemPadding}>Notes</div>
          </div>
        </div>
        <ThemeToggleButton />
      </div>
    </div>
  );
};
