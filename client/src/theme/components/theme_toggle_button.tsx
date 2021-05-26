/** @jsxImportSource @emotion/react */
import * as t from "io-ts";
import { css } from "@emotion/react";

import { shadow } from "../../style/shadow";
import { lighten } from "polished";
import { Theme, ThemeObject } from "../interface";
import { FunctionComponent } from "react";

import { ReactComponent as Sun } from "../assets/tabler-icon-sun.svg";
import { ReactComponent as Moon } from "../assets/tabler-icon-moon.svg";

type ThemeToggleButtonProps = {
  /**
   * The set of colors in the current theme.
   */
  theme_object: t.TypeOf<typeof ThemeObject>;

  /**
   * Whether the theme is light or dark.
   */
  theme: t.TypeOf<typeof Theme>;

  /**
   * A callback that is called when the theme is toggled.
   */
  handle_toggle_theme: () => void;
};

/**
 * A simple animated, horizontal button for toggling theme of the application.
 */
export const ThemeToggleButton: FunctionComponent<ThemeToggleButtonProps> = ({
  theme_object,
  theme,
  handle_toggle_theme,
}) => {
  const styles = {
    button: css`
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
    `,
    button_icon: css`
      position: absolute;
      transition: transform;
      transition-duration: 100ms;
      height: 1rem;
      width: 1rem;
      border-radius: 9999px;
      color: ${lighten(0.1, theme_object.colors.naviate_dark_blue)};
      fill: ${lighten(0.1, theme_object.colors.naviate_dark_blue)};
    `,
    button_knob: css`
      position: absolute;
      transition: transform;
      transition-duration: 100ms;
      height: 1rem;
      width: 1rem;
      border-radius: 9999px;
      background-color: ${lighten(0.1, theme_object.colors.naviate_dark_blue)};
      color: ${lighten(0.1, theme_object.colors.naviate_dark_blue)};
      color: ${lighten(0.1, theme_object.colors.naviate_dark_blue)};
    `,
    translate_x: (amount: number) => css`
      transform: translateX(${amount}rem);
    `,
  };

  return (
    <div>
      <button
        css={[styles.button]}
        type="button"
        aria-label="Toggle Theme"
        onClick={() => handle_toggle_theme()}
      >
        {theme === "dark" ? (
          <>
            <div css={[styles.button_icon, styles.translate_x(0.25)]}>
              <Moon css={[styles.button_icon]} />
            </div>
            <div css={[styles.button_knob, styles.translate_x(1.25)]} />
          </>
        ) : (
          <>
            <div css={[styles.button_icon, styles.translate_x(1.3)]}>
              <Sun css={[styles.button_icon]} />
            </div>
            <div css={[styles.button_knob, styles.translate_x(0.25)]} />
          </>
        )}
      </button>
    </div>
  );
};
