import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tag } from "./Tag";
import { shortAddress } from "../../../helpers";
import { TagIcon } from "./iconMapping";

export default {
  title: "Tag",
  component: Tag,
  argTypes: {
    icon: {
      options: [
        TagIcon.AUDIO,
        TagIcon.MESSAGING,
        TagIcon.SHOPPING,
        TagIcon.TRANSACTIONS,
      ],
      control: { type: "radio" },
    },
    text: {
      control: { type: "text" },
      defaultValue: "Tag Label",
    },
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const CategoryTag = Template.bind({});
CategoryTag.args = {
  text: "Messaging",
  icon: TagIcon.MESSAGING,
};

export const WalletAddressTag = Template.bind({});
WalletAddressTag.args = {
  text: shortAddress("0x1234567890123456789012345678901234567890"),
};

export const EnsAddressTag = Template.bind({});
EnsAddressTag.args = {
  text: "hi.xmtp.eth",
};

export const LensAddressTag = Template.bind({});
LensAddressTag.args = {
  text: "test.lens",
};

export const TagLoading = Template.bind({});
TagLoading.args = {
  isLoading: true,
};
