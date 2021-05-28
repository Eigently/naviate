/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { light_theme } from "../../theme/colors/light_theme";
import { dark_theme } from "../../theme/colors/dark_theme";

import { initial_state } from "../e6b_slice";

import { E6B } from "./e6b";
import { Surrounding } from "../../storybook/surrounding";

export default {
  title: "aviation/E6B",
  component: E6B,
  argTypes: {
    handle_form_input: { action: "handle_form_input" },
  },
};

const Template: Story<ComponentProps<typeof E6B>> = (args) => <E6B {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  correction_data: initial_state,
};
