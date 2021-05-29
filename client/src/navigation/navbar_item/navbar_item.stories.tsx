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

export const Primary = Template.bind({});
Primary.args = {
  active: true,
  item: "E6B",
};
