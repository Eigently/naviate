import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { ThemeToggleButton } from "./theme_toggle_button";
export default {
  title: "theme/ThemeToggleButton",
  component: ThemeToggleButton,
  argTypes: {
    handle_toggle_theme: { action: "handle_toggle_theme" },
  },
};

const Template: Story<ComponentProps<typeof ThemeToggleButton>> = (args) => (
  <ThemeToggleButton {...args} />
);

export const Primary = Template.bind({});
