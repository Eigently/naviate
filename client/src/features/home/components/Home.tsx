/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";

import { ThemeObject } from "../../theme/interface";
import { container } from "../../../style/container";

import { E6BContainer } from "../../e6b/container/E6BContainer";

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
            margin-top: 0.5rem;
          `,
        ]}
      >
        <E6BContainer />
      </div>
    </PageContainer>
  );
};
