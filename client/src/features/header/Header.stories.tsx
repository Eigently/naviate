/** @jsxImportSource @emotion/react */
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { lightTheme } from "../theme/colors/lightTheme";
import { darkTheme } from "../theme/colors/darkTheme";

import { Header } from "./Header";
import { css } from "@emotion/react";

export default {
  title: "features/header/Header",
  component: Header,
  argTypes: {
    handleToggleTheme: { action: "handleToggleTheme" },
  },
};

const Template: Story<ComponentProps<typeof Header>> = (args) => (
  <div
    css={[
      css`
        background-color: ${args.themeObject.colors.background};
        padding: 3rem;
      `,
    ]}
  >
    <Header {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  theme: "Light",
  themeObject: lightTheme,
};

/**
 * The thing can also be dark...
 */
export const Dark = Template.bind({});
Dark.args = {
  theme: "Dark",
  themeObject: darkTheme,
};
