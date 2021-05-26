/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { lighten } from "polished";

import { ThemeObject } from "../../theme/interface";

import { E6BForm } from "./e6b_form";
import { E6BIllustration } from "./e6b_illustration";

import { shadow } from "../../style/shadow";
import { E6BData } from "../interface";
import { mq } from "../../style/breakpoints";

type E6BProps = {
  theme_object: ThemeObject;
  correction_data: E6BData;
  handle_form_input: (
    course: number,
    true_airspeed: number,
    wind_direction: number,
    wind_speed: number
  ) => void;
};

export const E6B: FC<E6BProps> = ({
  theme_object,
  correction_data,
  handle_form_input,
}) => {
  return (
    <div
      css={[
        css`
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          ${mq.md} {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          background-color: ${lighten(0.05, theme_object.colors.background)};
          border-radius: 0.25rem;
          align-items: stretch;
        `,
        shadow.lg,
      ]}
    >
      <E6BForm
        theme_object={theme_object}
        handle_form_input={handle_form_input}
        correction_data={correction_data}
      />
      <E6BIllustration
        theme_object={theme_object}
        correction_data={correction_data}
      />
    </div>
  );
};
