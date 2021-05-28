/** @jsxImportSource @emotion/react */
import * as t from "io-ts";
import { FC } from "react";

import { ThemeObject } from "../../theme/interface";

import { E6BContainer } from "../../e6b/container/e6b_container";
import { DAtisContainer } from "../../d_atis/container/d_atis_container";
import { Stack } from "@chakra-ui/react";

type HomeProps = {
  PageContainer: React.FC;
  theme_object: t.TypeOf<typeof ThemeObject>;
};

export const Home: FC<HomeProps> = ({ PageContainer }) => {
  return (
    <PageContainer>
      <Stack spacing="4" py="4">
        <E6BContainer />
        <DAtisContainer />
      </Stack>
    </PageContainer>
  );
};
