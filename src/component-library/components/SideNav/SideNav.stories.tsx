import type { ComponentStory, ComponentMeta } from "@storybook/react";
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
  displayAddress: "hi.xmtp.eth",
  walletAddress: "0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0",
};
