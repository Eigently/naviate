import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { Header } from "./header";

export default {
  title: "layout/Header",
  component: Header,
};

const Template: Story<ComponentProps<typeof Header>> = (args) => (
  <Header {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

/**
 * The thing can also be dark...
 */
export const Dark = Template.bind({});
Dark.args = {};
