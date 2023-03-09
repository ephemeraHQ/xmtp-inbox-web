import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SideNav from "./SideNav";
import { shortAddress } from "../../../helpers";

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
  displayAddress: "hi.xmtp.eth",
  walletAddress: shortAddress("0x0123456789012345678901234567890123456789"),
};
