/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { lightTheme } from "../../theme/colors/lightTheme";
import { darkTheme } from "../../theme/colors/darkTheme";

import { NavItem } from "./NavItem";

export default {
  title: "features/navbar/NavItem",
  component: NavItem,
  decorators: [
    (Story: any) => {
      return (
        <div
          css={css`
            background-color: ${lightTheme.colors.naviateDarkBlue};
            display: flex;'
          `}
        >
          <Story />
        </div>
      );
    },
  ],
};

const Template: Story<ComponentProps<typeof NavItem>> = (args) => (
  <NavItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  active: true,
  item: "E6B",
  themeObject: lightTheme,
};
