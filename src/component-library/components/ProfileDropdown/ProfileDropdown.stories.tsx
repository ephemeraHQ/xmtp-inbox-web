import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { ProfileDropdown } from "./ProfileDropdown";
import { AddressSettingsCard } from "../AddressSettingsCard/AddressSettingsCard";
import { Avatar } from "../Avatar/Avatar";

export default {
  title: "ProfileDropdown",
  component: ProfileDropdown,
  argTypes: {
    addressCards: { control: false },
  },
} as ComponentMeta<typeof ProfileDropdown>;

const Template: ComponentStory<typeof ProfileDropdown> = (args) => (
  <ProfileDropdown {...args} />
);

export const ProfileDropdownOpen = Template.bind({});
ProfileDropdownOpen.args = {
  addressCards: [
    <AddressSettingsCard
      key={1}
      header="hi.xmtp.eth"
      avatar={<Avatar />}
      isConnected
    />,
    <AddressSettingsCard key={1} header="hi2.xmtp.eth" avatar={<Avatar />} />,
  ],
  isOpen: true,
};
