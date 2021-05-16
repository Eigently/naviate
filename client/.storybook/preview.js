import { GlobalStyles } from "twin.macro";
import { themes } from "@storybook/theming";
import { Suspense } from "react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.light,
  },
};

export const decorators = [
  (Story) => (
    <>
      <GlobalStyles />
      <Suspense fallback="loading">
        <Story />
      </Suspense>
    </>
  ),
];
