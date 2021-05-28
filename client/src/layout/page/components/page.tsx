import * as t from "io-ts";
import { FC, ReactNode } from "react";
import { ThemeObject } from "../../../theme/interface";
import { Flex, Container } from "@chakra-ui/react";

type PageProps = {
  children: ReactNode;
  theme_object: t.TypeOf<typeof ThemeObject>;
  HeaderContainer: ReactNode;
  FooterContainer: ReactNode;
};

export const Page: FC<PageProps> = ({
  children,
  HeaderContainer,
  FooterContainer,
}) => {
  return (
    <Flex direction="column" minHeight="100vh">
      {HeaderContainer}
      <Container maxW="container.xl" flexGrow={1}>
        {children}
      </Container>
      {FooterContainer}
    </Flex>
  );
};
