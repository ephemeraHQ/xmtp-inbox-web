import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SideNav from "./SideNav";

export default {
  title: "SideNav",
  component: SideNav,
  argTypes: {
    icon: { control: false },
  },
} as ComponentMeta<typeof SideNav>;

const Template: ComponentStory<typeof SideNav> = (args) => (
  <SideNav {...args} />
);

export const SideNavDefault = Template.bind({});
SideNavDefault.args = {
  isOpen: false,
};

export const SideNavOpen = Template.bind({});
SideNavOpen.args = {
  isOpen: true,
};
