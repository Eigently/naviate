/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { lighten } from "polished";

import { ThemeObject } from "../../theme/interface";

import { Form } from "./Form";
import { Illustration } from "./Illustration";

import { shadow } from "../../../style/shadow";

type E6BProps = {
  themeObject: ThemeObject;
};

export const E6B: FC<E6BProps> = ({ themeObject }) => {
  return (
    <div
      css={[
        css`
          display: flex;
          flex-direction: row;
          align-content: stretch;
          background-color: ${lighten(0.05, themeObject.colors.background)};
          border-radius: 0.25rem;
        `,
        shadow.lg,
      ]}
    >
      <Form themeObject={themeObject} />
      <Illustration themeObject={themeObject} />
    </div>
  );
};
