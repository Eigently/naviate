/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { lighten } from "polished";

import { ThemeObject } from "../../theme/interface";

import { shadow } from "../../../style/shadow";
import { mq } from "../../../style/breakpoints";

type DAtisProps = {
  themeObject: ThemeObject;
};

export const DAtis: FC<DAtisProps> = ({ themeObject }) => {
  return (
    <div
      css={[
        css`
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          ${mq.md} {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          background-color: ${lighten(0.05, themeObject.colors.background)};
          border-radius: 0.25rem;
          align-items: stretch;
          padding: 1rem;
        `,
        shadow.lg,
      ]}
    >
      <h1
        css={[
          css`
            font-size: 1.5rem;
            font-weight: 300;
            color: ${themeObject.colors.base};
          `,
        ]}
      >
        ATIS
      </h1>
    </div>
  );
};
