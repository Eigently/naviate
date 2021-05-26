/** @jsxImportSource @emotion/react */
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { FullPageLoading } from "./full_page_loading";
import { css } from "@emotion/react";

export default {
  title: "Loading/FullPageLoading",
  component: FullPageLoading,
  argTypes: {
    handle_form_input: { action: "handle_form_input" },
  },
};

const Template: Story<ComponentProps<typeof FullPageLoading>> = (args) => (
  <div
    css={[
      css`
        min-height: 100vh;
        min-width: 50vw;
      `,
    ]}
  >
    <FullPageLoading {...args} />
  </div>
);

export const Light = Template.bind({});
Light.args = {};

/**
 * The thing can also be dark...
 */
export const Dark = Template.bind({});
Dark.args = {};
