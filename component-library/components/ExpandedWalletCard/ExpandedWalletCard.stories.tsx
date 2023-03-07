import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ExpandedWalletCard } from "./ExpandedWalletCard";
import { Avatar } from "../Avatar/Avatar";
import { shortAddress } from "../../../helpers";

export default {
  title: "ExpandedWalletCard",
  component: ExpandedWalletCard,
  argTypes: {
    avatar: { control: false },
    addresses: { control: false },
    collectibles: { control: false },
  },
} as ComponentMeta<typeof ExpandedWalletCard>;

const Template: ComponentStory<typeof ExpandedWalletCard> = (args) => (
  <ExpandedWalletCard {...args} />
);

export const ExpandedWalletCardDefault = Template.bind({});
ExpandedWalletCardDefault.args = {
  isOpen: true,
  avatar: <Avatar />,
  currentAddress: "hi.xmtp.eth",
  addresses: [
    shortAddress("0x0123456789012345678901234567890123456789"),
    "hi.xmtp.eth",
    "hi.xmtp.lens",
  ],
  collectibles: [
    <Avatar key={1} />,
    <Avatar key={2} />,
    <Avatar key={3} />,
    <Avatar key={3} />,
  ],
};
