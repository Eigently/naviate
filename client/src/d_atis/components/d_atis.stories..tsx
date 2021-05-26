/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { light_theme } from "../../theme/colors/light_theme";
import { dark_theme } from "../../theme/colors/dark_theme";

import { DAtis } from "./d_atis";
import { Surrounding } from "../../storybook/surrounding";

export default {
  title: "D-ATIS",
  component: DAtis,
};

const Template: Story<ComponentProps<typeof DAtis>> = (args) => (
  <Surrounding args={args}>
    <DAtis {...args} />
  </Surrounding>
);

export const Light = Template.bind({});
Light.args = {
  theme_object: light_theme,
};

/**
 * The thing can also be dark...
 */
export const Dark = Template.bind({});
Dark.args = {
  theme_object: dark_theme,
};
