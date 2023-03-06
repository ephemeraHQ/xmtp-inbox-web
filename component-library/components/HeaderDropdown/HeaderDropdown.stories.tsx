import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { HeaderDropdown } from "./HeaderDropdown";

export default {
  title: "HeaderDropdown",
  component: HeaderDropdown,
  argTypes: {
    onChange: { control: false },
  },
} as ComponentMeta<typeof HeaderDropdown>;

const Template: ComponentStory<typeof HeaderDropdown> = (args) => (
  <HeaderDropdown {...args} />
);

export const HeaderDropdownCollapsed = Template.bind({});
HeaderDropdownCollapsed.args = {
  onChange: () => {},
};

export const HeaderDropdownOpenDefault = Template.bind({});
HeaderDropdownOpenDefault.args = {
  isOpen: true,
  onChange: () => {},
};

export const HeaderDropdownDifferentOption = Template.bind({});
HeaderDropdownDifferentOption.args = {
  isOpen: true,
  defaultSelected: "Message requests",
  onChange: () => {},
};
