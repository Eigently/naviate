/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { shadow } from "../../../style/shadow";
import { lighten } from "polished";
import { Theme, ThemeObject } from "../interface";
import { FunctionComponent } from "react";

import { ReactComponent as Sun } from "../assets/sun-solid.svg";
import { ReactComponent as Moon } from "../assets/moon-solid.svg";

type ThemeToggleButtonProps = {
  /**
   * The set of colors in the current theme.
   */
  themeObject: ThemeObject;

  /**
   * Whether the theme is light or dark.
   */
  theme: Theme;

  /**
   * A callback that is called when the theme is toggled.
   */
  handleToggleTheme: () => void;
};

/**
 * A simple animated, horizontal button for toggling theme of the application.
 */
export const ThemeToggleButton: FunctionComponent<ThemeToggleButtonProps> = (
  props
) => {
  const { themeObject, theme, handleToggleTheme } = props;

  const buttonIconStyle = css`
    position: absolute;
    transition: transform;
    transition-duration: 100ms;
    height: 0.9rem;
    width: 0.9rem;
    border-radius: 9999px;
    color: ${lighten(0.1, themeObject.colors.naviateDarkBlue)};
    fill: ${lighten(0.1, themeObject.colors.naviateDarkBlue)};
  `;

  const buttonKnobStyle = css`
    position: absolute;
    transition: transform;
    transition-duration: 100ms;
    height: 1rem;
    width: 1rem;
    border-radius: 9999px;
    background-color: ${lighten(0.1, themeObject.colors.naviateDarkBlue)};
    color: ${lighten(0.1, themeObject.colors.naviateDarkBlue)};
    color: ${lighten(0.1, themeObject.colors.naviateDarkBlue)};
  `;

  const translateX = (amount: number) => css`
    transform: translateX(${amount}rem);
  `;

  return (
    <div>
      <button
        css={css`
          position: relative;
          border-radius: 9999px;
          width: 2.5rem;
          height: 1.5rem;

          background-color: white;

          display: flex;
          flex-direction: row;
          align-items: center;
          ${shadow.md};

          &:focus {
            outline: none;
          }
        `}
        type="button"
        aria-label="Toggle Theme"
        onClick={() => handleToggleTheme()}
      >
        {theme === "Dark" ? (
          <>
            <div css={[buttonIconStyle, translateX(0.25)]}>
              <Moon />
            </div>
            <div css={[buttonKnobStyle, translateX(1.25)]} />
          </>
        ) : (
          <>
            <div css={[buttonIconStyle, translateX(1.35)]}>
              <Sun />
            </div>
            <div css={[buttonKnobStyle, translateX(0.25)]} />
          </>
        )}
      </button>
    </div>
  );
};
