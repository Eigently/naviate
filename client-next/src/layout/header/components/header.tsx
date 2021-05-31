import { FC } from "react";
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

import { NavItem } from "../../../navigation/navbar_item/navbar_item";
import { ThemeToggleButton } from "../../../theme/components/theme_toggle_button";

import { ReactComponent as NaviateLogo } from "../assets/wings.svg";
import { ReactComponent as E6B } from "../assets/tabler-icon-compass.svg";
import { ReactComponent as Performance } from "../assets/tabler-icon-plane-departure.svg";
import { ReactComponent as Plan } from "../assets/tabler-icon-calendar-time.svg";
import { ReactComponent as Notes } from "../assets/tabler-icon-notes.svg";

const ChakraNaviateLogo = chakra(NaviateLogo);

export const Header: FC = () => {
  const backgroundColor = useColorModeValue("purple.700", "purple.500");
  const activeColor = useColorModeValue("purple.600", "purple.600");
  const hoverColor = useColorModeValue("purple.500", "purple.700");
  const active = false;

  return (
    <Box background={backgroundColor} height="12">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
          <Grid
            templateColumns="auto repeat(4, 1fr)"
            alignItems="center"
            height="12"
          >
            <Link
              height="12"
              _hover={{ bg: hoverColor }}
              bg={active ? activeColor : ""}
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
