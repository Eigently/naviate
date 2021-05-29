import { ChakraProvider } from "@chakra-ui/react";
import { Routes } from "../routing/routes";
import { theme } from "../styles/theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes />
  </ChakraProvider>
);
