/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { lightTheme } from "../../theme/colors/lightTheme";
import { darkTheme } from "../../theme/colors/darkTheme";

import { Footer } from "./Footer";

export default {
  title: "features/footer/Footer",
  component: Footer,
  argTypes: {
    handleFormInput: { action: "handleFormInput" },
  },
};

const Template: Story<ComponentProps<typeof Footer>> = (args) => (
  <div
    css={[
      css`
        background-color: ${args.themeObject.colors.background};
        padding: 3rem;
      `,
    ]}
  >
    <Footer {...args} />
  </div>
);

export const Light = Template.bind({});
Light.args = {
  themeObject: lightTheme,
  clientVersion: "clientversion",
  serverVersion: "serverversion",
};

export const Dark = Template.bind({});
Dark.args = {
  themeObject: darkTheme,
  clientVersion: "clientversion",
  serverVersion: "serverversion",
};

export const Loading = Template.bind({});
Loading.args = {
  themeObject: lightTheme,
  clientVersion: "clientversion",
};

export const Uneven = Template.bind({});
Uneven.args = {
  themeObject: lightTheme,
  clientVersion: "clientve",
  serverVersion: "serverversion",
};
