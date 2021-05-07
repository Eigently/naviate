/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";

import { container } from "../../style/container";
import { shadow } from "../../style/shadow";
import { ThemeToggleButton } from "../theme/components/ThemeToggleButton";

import { Theme, ThemeObject } from "../theme/interface";

import { ReactComponent as Plane } from "./assets/wings.svg";

type HeaderProps = {
  theme: Theme;
  themeObject: ThemeObject;
  handleToggleTheme: () => void;
};

export const Header: FC<HeaderProps> = (props) => {
  const { theme, themeObject, handleToggleTheme } = props;

  const menuItemPadding = css`
    padding: 0rem 0.5rem;
  `;

  return (
    <div
      css={css`
        color: white;
        background-color: ${themeObject.colors.naviateDarkBlue};
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
        <div
          css={css`
            padding: 0rem 1rem;
          `}
        >
          <ThemeToggleButton
            theme={theme}
            themeObject={themeObject}
            handleToggleTheme={handleToggleTheme}
          />
        </div>
      </div>
    </div>
  );
};
