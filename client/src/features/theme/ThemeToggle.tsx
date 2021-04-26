/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTheme, selectThemeObject } from "./selectThemeObject";
import { shadow } from "../style/shadow";
import { toggleTheme } from "./themeSlice";
import { lighten } from "polished";

export const ThemeToggleButton = () => {
  const theme = useAppSelector(selectTheme);
  const themeObject = useAppSelector(selectThemeObject);

  const dispatch = useAppDispatch();

  const buttonIconStyle = css`
    position: absolute;
    transition: transform;
    transition-duration: 100ms;
    height: 0.75rem;
    width: 0.75rem;
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
        onClick={() => {
          console.log("Clicked!");
          dispatch(toggleTheme());
        }}
      >
        <FontAwesomeIcon
          icon={theme === "Dark" ? faMoon : faSun}
          css={[
            buttonIconStyle,
            theme === "Dark" ? translateX(0) : translateX(1.1),
          ]}
        />
        <div
          css={[
            buttonKnobStyle,
            theme === "Dark" ? translateX(1.25) : translateX(0.25),
          ]}
        />
      </button>
    </div>
  );
};
