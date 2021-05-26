/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";

import { ThemeObject } from "../../theme/interface";
import { container } from "../../style/container";

import { E6BContainer } from "../../e6b/container/e6b_container";
import { DAtisContainer } from "../../d_atis/container/d_atis_container";

type HomeProps = {
  PageContainer: React.FC;
  theme_object: ThemeObject;
};

export const Home: FC<HomeProps> = ({ theme_object, PageContainer }) => {
  const styles = {
    content_grid: css`
      padding: 0.5rem 1rem;
      margin-top: 0.5rem;
      display: grid;
      grid-template-columns: 100%;
      grid-row-gap: 1rem;
    `,
  };

  return (
    <PageContainer>
      <div css={[container, styles.content_grid]}>
        <E6BContainer />
        <DAtisContainer />
      </div>
    </PageContainer>
  );
};
