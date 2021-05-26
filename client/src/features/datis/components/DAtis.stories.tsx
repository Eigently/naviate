/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { lightTheme } from "../../theme/colors/lightTheme";
import { darkTheme } from "../../theme/colors/darkTheme";

import { DAtis } from "./DAtis";

export default {
  title: "features/datis/DAtis",
  component: DAtis,
  argTypes: {
    handleFormInput: { action: "handleFormInput" },
  },
};

const Template: Story<ComponentProps<typeof DAtis>> = (args) => (
  <div
    css={[
      css`
        background-color: ${args.themeObject.colors.background};
        padding: 3rem;
      `,
    ]}
  >
    <DAtis {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  themeObject: lightTheme,
};

/**
 * The thing can also be dark...
 */
export const Dark = Template.bind({});
Dark.args = {
  themeObject: darkTheme,
};
