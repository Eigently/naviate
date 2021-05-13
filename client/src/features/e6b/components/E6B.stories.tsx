/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { E6B } from "./E6B";
import { lightTheme } from "../../theme/colors/lightTheme";
import { darkTheme } from "../../theme/colors/darkTheme";

export default {
  title: "features/e6b/E6B",
  component: E6B,
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
};

/**
 * The thing can also be dark...
 */
export const Dark = Template.bind({});
Dark.args = {
  themeObject: darkTheme,
};
