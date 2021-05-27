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
  <div
    css={[
      css`
        background-color: ${args.theme_object.colors.background};
        padding: 3rem;
      `,
    ]}
  >
    <Footer {...args} />
  </div>
);

export const Light = Template.bind({});
Light.args = {
  theme_object: light_theme,
  client_version: "clientversion",
  server_version: "serverversion",
};

export const Dark = Template.bind({});
Dark.args = {
  theme_object: dark_theme,
  client_version: "clientversion",
  server_version: "serverversion",
};

export const Loading = Template.bind({});
Loading.args = {
  theme_object: light_theme,
  client_version: "clientversion",
};

export const Uneven = Template.bind({});
Uneven.args = {
  theme_object: light_theme,
  client_version: "clientve",
  server_version: "serverversion",
};
