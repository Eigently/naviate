import { ChakraProvider } from "@chakra-ui/react";
import { Routes } from "../routing/routes";
import { theme } from "../theme/colors/theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes />
  </ChakraProvider>
);
