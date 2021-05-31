import { FC, ReactNode } from "react";
import { Flex, Container } from "@chakra-ui/react";

type PageProps = {
  children: ReactNode;
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
