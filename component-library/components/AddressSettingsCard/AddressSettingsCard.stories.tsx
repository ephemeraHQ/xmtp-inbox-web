import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AddressSettingsCard } from "./AddressSettingsCard";
import { Avatar } from "../Avatar/Avatar";
import { shortAddress } from "../../../helpers";

export default {
  title: "AddressSettingsCard",
  component: AddressSettingsCard,
  argTypes: {
    variant: { control: false },
    avatar: { control: false },
    header: { control: { type: "string" }, defaultValue: "Placeholder header" },
    subtext: {
      control: { type: "string" },
      defaultValue: "Placeholder subtext",
    },
    leftIcon: { control: false },
  },
} as ComponentMeta<typeof AddressSettingsCard>;

const Template: ComponentStory<typeof AddressSettingsCard> = (args) => (
  <AddressSettingsCard {...args} />
);

export const DisconnectedAddressTextWithIcon = Template.bind({});
DisconnectedAddressTextWithIcon.args = {
  avatar: <Avatar />,
  header: "hi.xmtp.eth",
  subtext: shortAddress("0x1234567890123456789012345678901234567890"),
};

export const ConnectedAddressTextWithIcon = Template.bind({});
ConnectedAddressTextWithIcon.args = {
  avatar: <Avatar />,
  header: "hi.xmtp.eth",
  subtext: shortAddress("0x1234567890123456789012345678901234567890"),
  isConnected: true,
};

export const DisconnectedAddressTextWithIconLoading = Template.bind({});
DisconnectedAddressTextWithIconLoading.args = {
  avatar: <Avatar isLoading />,
  isLoading: true,
};

export const ConnectedAddressTextWithIconLoading = Template.bind({});
ConnectedAddressTextWithIconLoading.args = {
  avatar: <Avatar isLoading />,
  isConnected: true,
  isLoading: true,
};
