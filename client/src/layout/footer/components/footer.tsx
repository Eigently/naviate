import * as t from "io-ts";
import { FC } from "react";
import { Container, Flex, Icon, Grid, Text, Link } from "@chakra-ui/react";

import { ThemeObject } from "../../../theme/interface";

import { ReactComponent as Heart } from "../assets/tabler-icon-heart.svg";
import { ReactComponent as Plane } from "../assets/tabler-icon-plane.svg";

type FooterProps = {
  theme_object: t.TypeOf<typeof ThemeObject>;
  client_version: String;
  server_version?: String;
};

export const Footer: FC<FooterProps> = ({
  theme_object,
  client_version,
  server_version,
}) => {
  return (
    <Container maxW="container.xl" fontSize="xs">
      <Flex direction="row" justifyContent="space-between" my={4}>
        <Flex direction="column">
          <Text>
            Made with
            <Icon mx={1} verticalAlign="baseline" as={Heart} />
            for
            <Icon mx={1} verticalAlign="baseline" as={Plane} />
            Simulation
          </Text>
          <Text>Do not use for real world flight navigation.</Text>
        </Flex>
        <Grid templateColumns="1fr auto">
          <Text mr="1">Client:</Text>
          <Link
            href={`https://github.com/eigently/naviate/commit/${client_version}`}
            fontFamily="monospace"
          >
            {client_version.substr(0, 7)}
          </Link>
          {server_version && (
            <>
              <Text mr="1">Server:</Text>
              <Link
                href={`https://github.com/eigently/naviate/commit/${server_version}`}
                fontFamily="monospace"
              >
                {server_version.substr(0, 7)}
              </Link>
            </>
          )}
        </Grid>
      </Flex>
    </Container>
  );
};
