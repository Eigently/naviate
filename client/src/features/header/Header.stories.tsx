import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { lightTheme } from "../theme/colors/lightTheme";
import { darkTheme } from "../theme/colors/darkTheme";

import { Header } from "./Header";

export default {
  title: "features/header/Header",
  component: Header,
  argTypes: {
    handleToggleTheme: { action: "handleToggleTheme" },
  },
};

const Template: Story<ComponentProps<typeof Header>> = (args) => (
  <Header {...args} />
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
