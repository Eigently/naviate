import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import { store } from "../state/store";
import { theme } from "../styles/theme";

export const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
