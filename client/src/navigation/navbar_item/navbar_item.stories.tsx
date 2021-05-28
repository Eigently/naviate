import { ComponentProps } from "react";
import { Story } from "@storybook/react";
import { NavItem } from "./navbar_item";

export default {
  title: "navigation/NavItem",
  component: NavItem,
};

const Template: Story<ComponentProps<typeof NavItem>> = (args) => (
  <NavItem {...args} />
);

export const Light = Template.bind({});
Light.args = {
  active: true,
  item: "E6B",
};

export const Dark = Template.bind({});
Dark.args = {
  active: true,
  item: "E6B",
};
