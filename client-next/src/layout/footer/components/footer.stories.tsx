import { ComponentProps } from "react";
import { Story } from "@storybook/react";
import { Footer } from "./footer";

export default {
  title: "Layout/Footer",
  component: Footer,
};

const Template: Story<ComponentProps<typeof Footer>> = (args) => (
  <Footer {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  clientVersion: "clientversion",
  serverVersion: "serverversion",
};

export const Uneven = Template.bind({});
Uneven.args = {
  clientVersion: "clien",
  serverVersion: "serverversion",
};
