/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { light_theme } from "../../theme/colors/light_theme";
import { dark_theme } from "../../theme/colors/dark_theme";

import { NavItem } from "./navbar_item";
import { Surrounding } from "../../storybook/surrounding";

export default {
  title: "navigation/NavItem",
  component: NavItem,
};

const Template: Story<ComponentProps<typeof NavItem>> = (args) => (
  <Surrounding args={args}>
    <div
      css={css`
        background-color: ${light_theme.colors.naviate_dark_blue};
        display: flex;
        padding-left: 1rem;
      `}
    >
      <NavItem {...args} />
    </div>
  </Surrounding>
);

export const Light = Template.bind({});
Light.args = {
  active: true,
  item: "E6B",
  theme_object: light_theme,
};

export const Dark = Template.bind({});
Dark.args = {
  active: true,
  item: "E6B",
  theme_object: dark_theme,
};
