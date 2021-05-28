/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { light_theme } from "../../../theme/colors/light_theme";
import { dark_theme } from "../../../theme/colors/dark_theme";

import { Footer } from "./footer";

export default {
  title: "Layout/Footer",
  component: Footer,
};

const Template: Story<ComponentProps<typeof Footer>> = (args) => (
  <Footer {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  theme_object: light_theme,
  client_version: "clientversion",
  server_version: "serverversion",
};

export const Uneven = Template.bind({});
Uneven.args = {
  theme_object: light_theme,
  client_version: "clien",
  server_version: "serverversion",
};
