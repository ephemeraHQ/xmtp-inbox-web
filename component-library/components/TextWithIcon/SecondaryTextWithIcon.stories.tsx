import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextWithIcon } from "./TextWithIcon";

export default {
  title: "TextWithIcon/Secondary",
  component: TextWithIcon,
  argTypes: {
    variant: { control: false },
    avatar: { control: false },
    header: { control: "text", defaultValue: "Placeholder header" },
    subtext: { control: false },
    leftIcon: {
      options: ["CONNECT_WALLET", "CREATE_WALLET"],
      control: { type: "radio" },
      defaultValue: "CONNECT_WALLET",
    },
    rightIcon: { control: false },
  },
} as ComponentMeta<typeof TextWithIcon>;

const Template: ComponentStory<typeof TextWithIcon> = (args) => (
  <TextWithIcon {...args} variant="secondary" />
);

export const SecondaryTextWithIcon = Template.bind({});
SecondaryTextWithIcon.args = {
  leftIcon: "CONNECT_WALLET",
  header: "Connect your wallet",
};

export const SecondaryTextWithIconLoading = Template.bind({});
SecondaryTextWithIconLoading.args = {
  isLoading: true,
};
