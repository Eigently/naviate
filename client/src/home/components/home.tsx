import { FC } from "react";

import { E6BContainer } from "../../e6b/container/e6b_container";
import { AtisContainer } from "../../atis/container/atis_container";
import { Stack } from "@chakra-ui/react";

type HomeProps = {
  PageContainer: React.FC;
};

export const Home: FC<HomeProps> = ({ PageContainer }) => {
  return (
    <PageContainer>
      <Stack spacing="4" py="4">
        <E6BContainer />
        <AtisContainer />
      </Stack>
    </PageContainer>
  );
};
