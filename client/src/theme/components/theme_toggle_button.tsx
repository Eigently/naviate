/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { shadow } from "../../style/shadow";
import { lighten } from "polished";
import { FC } from "react";

import { ReactComponent as Sun } from "../assets/tabler-icon-sun.svg";
import { ReactComponent as Moon } from "../assets/tabler-icon-moon.svg";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { chakra } from "@chakra-ui/system";

/**
 * A simple animated, horizontal button for toggling theme of the application.
 */
export const ThemeToggleButton: FC = () => {
  const styles = {
    button: css`
      position: relative;
      border-radius: 9999px;
      width: 2.5rem;
      height: 1.5rem;

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
      transition: transform, background-color, color;
      transition-duration: 200ms;
      height: 1rem;
      width: 1rem;
      border-radius: 9999px;
    `,
    button_knob: css`
      position: absolute;
      transition: transform, background-color, color;
      transition-duration: 200ms;
      height: 1rem;
      width: 1rem;
      border-radius: 9999px;
    `,
    translate_x: (amount: number) => css`
      transform: translateX(${amount}rem);
    `,
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const backgroundColor = useColorModeValue("white", "gray.800");
  const knobColor = useColorModeValue("purple.600", "purple.400");

  return (
    <chakra.button
      css={[styles.button]}
      type="button"
      aria-label="Toggle Theme"
      onClick={toggleColorMode}
      bg={backgroundColor}
    >
      {colorMode === "dark" ? (
        <>
          <div css={[styles.button_icon, styles.translate_x(0.25)]}>
            <Moon css={[styles.button_icon]} />
          </div>
          <chakra.div
            css={[styles.button_knob, styles.translate_x(1.25)]}
            bg={knobColor}
          />
        </>
      ) : (
        <>
          <div css={[styles.button_icon, styles.translate_x(1.3)]}>
            <Sun css={[styles.button_icon]} />
          </div>
          <chakra.div
            css={[styles.button_knob, styles.translate_x(0.25)]}
            bg={knobColor}
          />
        </>
      )}
    </chakra.button>
  );
};
