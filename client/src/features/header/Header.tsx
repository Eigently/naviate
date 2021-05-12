/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";

import { container } from "../../style/container";
import { shadow } from "../../style/shadow";
import { NavItem } from "../navbar/navitem/NavItem";
import { ThemeToggleButton } from "../theme/components/ThemeToggleButton";

import { Theme, ThemeObject } from "../theme/interface";

import { ReactComponent as NaviateLogo } from "./assets/wings.svg";
import { ReactComponent as E6B } from "./assets/tabler-icon-compass.svg";
import { ReactComponent as Performance } from "./assets/tabler-icon-plane-departure.svg";
import { ReactComponent as Plan } from "./assets/tabler-icon-calendar-time.svg";
import { ReactComponent as Notes } from "./assets/tabler-icon-notes.svg";

type HeaderProps = {
  theme: Theme;
  themeObject: ThemeObject;
  handleToggleTheme: () => void;
};

export const Header: FC<HeaderProps> = (props) => {
  const { theme, themeObject, handleToggleTheme } = props;

  return (
    <div
      css={css`
        color: white;
        background-color: ${themeObject.colors.naviateDarkBlue};
        ${shadow.md}
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
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 0rem 0.5rem;
          `}
        >
          <NaviateLogo
            css={css`
              height: 2rem;
              margin: 0rem 0.5rem;
            `}
          />
          <div
            css={css`
              display: flex;
              flex-direction: row;
              // font-size: 1.2rem;
            `}
          >
            <NavItem active={true} item={<E6B />} themeObject={themeObject} />
            <NavItem item={<Performance />} themeObject={themeObject} />
            <NavItem item={<Plan />} themeObject={themeObject} />
            <NavItem item={<Notes />} themeObject={themeObject} />
          </div>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            font-size: 1.2rem;
            margin: 0rem 0.5rem;
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
