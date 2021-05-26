/** @jsxImportSource @emotion/react */
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { Header } from "./header";
import { light_theme } from "../../../theme/colors/light_theme";
import { dark_theme } from "../../../theme/colors/dark_theme";
import { Surrounding } from "../../../storybook/surrounding";

export default {
  title: "layout/Header",
  component: Header,
  argTypes: {
    handle_toggle_theme: { action: "handle_toggle_theme" },
  },
};

const Template: Story<ComponentProps<typeof Header>> = (args) => (
  <Surrounding args={args}>
    <Header {...args} />
  </Surrounding>
);

export const Light = Template.bind({});
Light.args = {
  theme: "Light",
  theme_object: light_theme,
};

/**
 * The thing can also be dark...
 */
export const Dark = Template.bind({});
Dark.args = {
  theme: "Dark",
  theme_object: dark_theme,
};
