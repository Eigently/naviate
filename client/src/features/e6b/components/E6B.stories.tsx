/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps, lazy } from "react";
import { Story } from "@storybook/react";

import { lightTheme } from "../../theme/colors/lightTheme";
import { darkTheme } from "../../theme/colors/darkTheme";

import { initialState } from "../e6bSlice";

const E6B = lazy(() => import("./E6B"));

export default {
  title: "features/e6b/E6B",
  component: E6B,
  argTypes: {
    handleFormInput: { action: "handleFormInput" },
  },
};

const Template: Story<ComponentProps<typeof E6B>> = (args) => (
  <div
    css={[
      css`
        background-color: ${args.themeObject.colors.background};
        padding: 3rem;
      `,
    ]}
  >
    <E6B {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  themeObject: lightTheme,
  correctionData: initialState,
};

/**
 * The thing can also be dark...
 */
export const Dark = Template.bind({});
Dark.args = {
  themeObject: darkTheme,
  correctionData: initialState,
};
