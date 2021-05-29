import * as t from "io-ts";
import { FC } from "react";

import { NavItem } from "../../../navigation/navbar_item/navbar_item";

import { ThemeToggleButton } from "../../../theme/components/theme_toggle_button";
import { Theme, ThemeObject } from "../../../theme/interface";

import { ReactComponent as NaviateLogo } from "../assets/wings.svg";
import { ReactComponent as E6B } from "../assets/tabler-icon-compass.svg";
import { ReactComponent as Performance } from "../assets/tabler-icon-plane-departure.svg";
import { ReactComponent as Plan } from "../assets/tabler-icon-calendar-time.svg";
import { ReactComponent as Notes } from "../assets/tabler-icon-notes.svg";
import {
  Box,
  chakra,
  Container,
  Flex,
  Stack,
  Grid,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

const ChakraNaviateLogo = chakra(NaviateLogo);

type HeaderProps = {
  theme: t.TypeOf<typeof Theme>;
  theme_object: t.TypeOf<typeof ThemeObject>;
  handle_toggle_theme: () => void;
};

export const Header: FC<HeaderProps> = ({
  theme,
  theme_object,
  handle_toggle_theme,
}) => {
  const background_color = useColorModeValue("purple.700", "purple.500");
  const active_color = useColorModeValue("purple.600", "purple.600");
  const hover_color = useColorModeValue("purple.500", "purple.700");
  const active = false;

  return (
    <Box background={background_color} height="12">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
          <Grid
            templateColumns="auto repeat(4, 1fr)"
            alignItems="center"
            height="12"
          >
            <Link
              height="12"
              _hover={{ bg: hover_color }}
              bg={active ? active_color : ""}
              px="2"
              py="2"
              cursor="pointer"
              href="#"
            >
              <ChakraNaviateLogo height="100%" />
            </Link>
            <NavItem active={true} item={<E6B />} />
            <NavItem item={<Performance />} />
            <NavItem item={<Plan />} />
            <NavItem item={<Notes />} />
          </Grid>
          <Stack direction="row" alignItems="center">
            <ThemeToggleButton />
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};
