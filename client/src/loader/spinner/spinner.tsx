/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as t from "io-ts";

import { FC } from "react";
import { ThemeObject } from "../../theme/interface";

type SpinnerProps = {
  theme_object: t.TypeOf<typeof ThemeObject>;
  color: string;
};

export const Spinner: FC<SpinnerProps> = ({ color }) => {
  const styles = {
    aspect_ratio: css`
      width: 100%;
      padding-top: 100%; /* 1:1 Aspect Ratio */
      position: relative;
    `,
    grid: css`
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
    `,
    cube: css`
      animation: cube_animation 1.3s infinite ease-in-out;
      background-color: ${color};
      @keyframes cube_animation {
        0%,
        70%,
        100% {
          -webkit-transform: scale3D(1, 1, 1);
          transform: scale3D(1, 1, 1);
        }
        35% {
          -webkit-transform: scale3D(0, 0, 1);
          transform: scale3D(0, 0, 1);
        }
      }
    `,
    delay: (amount: number) => css`
      animation-delay: ${amount}s;
    `,
  };

  return (
    <div css={[styles.aspect_ratio]}>
      <div css={[styles.grid]}>
        {[0.2, 0.3, 0.4, 0.1, 0.2, 0.3, 0.0, 0.1, 0.2].map((delay) => {
          return <div css={[styles.cube, styles.delay(delay)]} />;
        })}
      </div>
    </div>
  );
};
