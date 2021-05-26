import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { ThemeToggleButton } from "./theme_toggle_button";
import { light_theme } from "../colors/light_theme";
import { dark_theme } from "../colors/dark_theme";
import { Surrounding } from "../../storybook/surrounding";

export default {
  title: "theme/ThemeToggleButton",
  component: ThemeToggleButton,
  argTypes: {
    handle_toggle_theme: { action: "handle_toggle_theme" },
  },
};

const Template: Story<ComponentProps<typeof ThemeToggleButton>> = (args) => (
  <Surrounding args={args}>
    <ThemeToggleButton {...args} />
  </Surrounding>
);

export const Light = Template.bind({});
Light.args = {
  theme: "light",
  theme_object: light_theme,
};

/**
 * The thing can also be dark...
 */
export const Dark = Template.bind({});
Dark.args = {
  theme: "dark",
  theme_object: dark_theme,
};
