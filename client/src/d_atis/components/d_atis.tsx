/** @jsxImportSource @emotion/react */
import * as t from "io-ts";
import { css } from "@emotion/react";
import { FC } from "react";
import { lighten } from "polished";

import { ThemeObject } from "../../theme/interface";

import { shadow } from "../../style/shadow";
import { mq } from "../../style/breakpoints";

type DAtisProps = {
  theme_object: t.TypeOf<typeof ThemeObject>;
};

export const DAtis: FC<DAtisProps> = ({ theme_object }) => {
  let styles = {
    grid: css`
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      ${mq.md} {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      background-color: ${lighten(0.05, theme_object.colors.background)};
      border-radius: 0.25rem;
      align-items: stretch;
      padding: 1rem;
    `,
    h1: css`
      font-size: 1.5rem;
      font-weight: 300;
      color: ${theme_object.colors.base};
    `,
  };

  return (
    <div css={[styles.grid, shadow.lg]}>
      <h1 css={[styles.h1]}>ATIS</h1>
    </div>
  );
};
