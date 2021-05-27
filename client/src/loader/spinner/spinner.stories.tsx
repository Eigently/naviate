/** @jsxImportSource @emotion/react */
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { Spinner } from "./spinner";
import { light_theme } from "../../theme/colors/light_theme";
import { Surrounding } from "../../storybook/surrounding";
import { dark_theme } from "../../theme/colors/dark_theme";
import { css } from "@emotion/react";

export default {
  title: "Loading/Spinner",
  component: Spinner,
  argTypes: {
    handle_form_input: { action: "handle_form_input" },
  },
};

const Template: Story<ComponentProps<typeof Spinner>> = (args) => (
  <Surrounding args={args}>
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          width: 9rem;
        `}
      >
        <Spinner {...args} />
      </div>
    </div>
  </Surrounding>
);

export const Light = Template.bind({});
Light.args = {
  theme_object: light_theme,
  color: light_theme.colors.naviate_dark_blue,
};

/**
 * The thing can also be dark...
 */
export const Dark = Template.bind({});
Dark.args = {
  theme_object: dark_theme,
  color: light_theme.colors.naviate_dark_blue,
};
