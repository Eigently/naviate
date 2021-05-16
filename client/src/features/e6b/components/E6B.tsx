/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { lighten } from "polished";

import { ThemeObject } from "../../theme/interface";

import { Form } from "./Form";
import { Illustration } from "./Illustration";

import { shadow } from "../../../style/shadow";
import { E6BData } from "../interface";
import { mq } from "../../../style/breakpoints";

type E6BProps = {
  themeObject: ThemeObject;
  correctionData: E6BData;
  handleFormInput: (
    course: number,
    trueAirspeed: number,
    windDirection: number,
    windSpeed: number
  ) => void;
};

export const E6B: FC<E6BProps> = ({
  themeObject,
  correctionData,
  handleFormInput,
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
          background-color: ${lighten(0.05, themeObject.colors.background)};
          border-radius: 0.25rem;
          align-items: stretch;
        `,
        shadow.lg,
      ]}
    >
      <Form
        themeObject={themeObject}
        handleFormInput={handleFormInput}
        correctionData={correctionData}
      />
      <Illustration themeObject={themeObject} correctionData={correctionData} />
    </div>
  );
};
