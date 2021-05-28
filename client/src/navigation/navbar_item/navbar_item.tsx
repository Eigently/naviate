import { FC, ReactNode } from "react";
import { useColorModeValue, Link } from "@chakra-ui/react";

type NavItemProps = {
  active?: boolean;
  item: ReactNode;
};

export const NavItem: FC<NavItemProps> = ({ active = false, item }) => {
  const active_color = useColorModeValue("purple.600", "purple.600");
  const hover_color = useColorModeValue("purple.500", "purple.700");

  return (
    <Link
      display="flex"
      bg={active ? active_color : ""}
      _hover={{ bg: hover_color }}
      transition="background-color 100ms"
      color="white"
      height="12"
      px="2"
      href="#"
      cursor="pointer"
      justifyContent="center"
      alignItems="center"
    >
      {item}
    </Link>
  );
};
