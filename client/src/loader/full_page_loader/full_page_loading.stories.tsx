import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { FullPageLoading } from "./full_page_loading";
import { css } from "@emotion/react";

export default {
  title: "Loading/FullPageLoading",
  component: FullPageLoading,
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

export const Primary = Template.bind({});
Primary.args = {};

/**
 * The thing can also be dark...
 */
export const Dark = Template.bind({});
Dark.args = {};
