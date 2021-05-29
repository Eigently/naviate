import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { initialState } from "../e6b_slice";
import { E6B } from "./e6b";

export default {
  title: "aviation/E6B",
  component: E6B,
  argTypes: {
    handleFormInput: { action: "handleFormInput" },
  },
};

const Template: Story<ComponentProps<typeof E6B>> = (args) => <E6B {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  correctionData: initialState,
};
