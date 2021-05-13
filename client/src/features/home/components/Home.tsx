/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";

import { ThemeObject } from "../../theme/interface";
import { container } from "../../../style/container";

import * as e6b from "naviate-e6b";

type HomeProps = {
  PageContainer: React.FC;
  themeObject: ThemeObject;
};

export const Home: FC<HomeProps> = ({ PageContainer, themeObject }) => {
  return (
    <PageContainer>
      <div
        css={[
          container,
          css`
            padding: 0.5rem 1rem;
          `,
        ]}
      >
        <h1
          css={[
            css`
              font-size: 1.5rem;
              font-weight: 300;
            `,
          ]}
        >
          E6B Calculator
        </h1>
        <button
          css={[
            css`
              background-color: ${themeObject.colors.naviateDarkBlue};
              padding: 1rem;
              border-radius: 0.25rem;
            `,
          ]}
          onClick={() => e6b.greet()}
        >
          WASM
        </button>
      </div>
    </PageContainer>
  );
};
