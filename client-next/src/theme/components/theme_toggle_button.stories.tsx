import { ComponentProps } from "react";
import { Story } from "@storybook/react";
import { Box, useColorModeValue } from "@chakra-ui/react";

import { ThemeToggleButton } from "./theme_toggle_button";
export default {
  title: "theme/ThemeToggleButton",
  component: ThemeToggleButton,
  argTypes: {
    handle_toggle_theme: { action: "handle_toggle_theme" },
  },
};

const Template: Story<ComponentProps<typeof ThemeToggleButton>> = (args) => {
  const backgroundColor = useColorModeValue("purple.700", "purple.500");

  return (
    <Box bg={backgroundColor} padding="1rem">
      <ThemeToggleButton {...args} />
    </Box>
  );
};

export const Primary = Template.bind({});
