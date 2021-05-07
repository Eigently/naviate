import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { ThemeToggleButton } from "./ThemeToggleButton";
import { lightTheme } from "../colors/lightTheme";
import { darkTheme } from "../colors/darkTheme";

export default {
  title: "features/theme/ThemeToggleButton",
  component: ThemeToggleButton,
  argTypes: {
    handleToggleTheme: { action: "handleToggleTheme" },
  },
};

const Template: Story<ComponentProps<typeof ThemeToggleButton>> = (args) => (
  <ThemeToggleButton {...args} />
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
